// Utility functions for data dictionary
class DataDictionary {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.currentFilters = {};
    }

    async loadData(jsonPath = '../dados/dicionario_dados.json') {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            this.data = jsonData;
            this.filteredData = [...this.data];
            return this.data;
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim());
        if (lines.length === 0) return [];

        const headers = this.parseCSVLine(lines[0]);
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }
        }

        return data;
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        let i = 0;

        while (i < line.length) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"' && inQuotes && nextChar === '"') {
                current += '"';
                i += 2;
            } else if (char === '"') {
                inQuotes = !inQuotes;
                i++;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
                i++;
            } else {
                current += char;
                i++;
            }
        }

        result.push(current);
        return result;
    }

    applyFilters(filters) {
        this.currentFilters = filters;
        this.filteredData = this.data.filter(row => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                return row[key] && row[key].toLowerCase().includes(filters[key].toLowerCase());
            });
        });
        return this.filteredData;
    }

    search(query) {
        if (!query) {
            this.filteredData = [...this.data];
            return this.filteredData;
        }

        const searchLower = query.toLowerCase();
        this.filteredData = this.data.filter(row => {
            return Object.values(row).some(value => 
                value && value.toString().toLowerCase().includes(searchLower)
            );
        });
        return this.filteredData;
    }

    getUniqueValues(column) {
        return [...new Set(this.data.map(row => row[column]).filter(val => val))].sort();
    }

    getStatistics() {
        const uniqueFiles = this.getUniqueValues('arquivo');
        const uniqueThemes = this.getUniqueValues('tema');
        const totalFields = this.data.length;
        
        // Get latest update
        const dates = this.data
            .map(row => row['data ultima atualizacao'])
            .filter(date => date)
            .map(date => new Date(date))
            .filter(date => !isNaN(date));
        
        const latestDate = dates.length > 0 
            ? new Date(Math.max(...dates)).toLocaleDateString('pt-BR') 
            : 'N/A';

        return {
            totalDatasets: uniqueThemes.length,
            totalFields: totalFields,
            totalFiles: uniqueFiles.length,
            lastUpdate: latestDate
        };
    }

    exportToCSV() {
        if (this.filteredData.length === 0) return '';

        const headers = Object.keys(this.filteredData[0]);
        const csvRows = [headers.join(',')];

        this.filteredData.forEach(row => {
            const values = headers.map(header => {
                const value = row[header] || '';
                return `"${value.toString().replace(/"/g, '""')}"`;
            });
            csvRows.push(values.join(','));
        });

        return csvRows.join('\n');
    }

    exportToJSON() {
        return JSON.stringify(this.filteredData, null, 2);
    }
}

// File analysis utilities
class FileAnalyzer {
    static analyzeCSV(csvData) {
        if (!csvData || csvData.length === 0) return null;

        const sample = csvData.slice(0, 100);
        const headers = Object.keys(sample[0]);
        const analysis = {
            recordCount: csvData.length,
            fieldCount: headers.length,
            fields: {}
        };

        headers.forEach(header => {
            const values = sample.map(row => row[header]).filter(val => val != null && val !== '');
            
            analysis.fields[header] = {
                name: header,
                type: this.inferDataType(values),
                sampleValue: values[0] || '',
                uniqueCount: new Set(values).size,
                nullCount: sample.length - values.length,
                fillRate: ((values.length / sample.length) * 100).toFixed(1) + '%'
            };
        });

        return analysis;
    }

    static inferDataType(values) {
        if (values.length === 0) return 'string';

        // Check for numbers
        const numericValues = values.filter(val => !isNaN(parseFloat(val)) && isFinite(val));
        if (numericValues.length > values.length * 0.8) {
            const hasDecimals = numericValues.some(val => val.toString().includes('.'));
            return hasDecimals ? 'float' : 'integer';
        }

        // Check for dates
        const dateValues = values.filter(val => {
            const date = new Date(val);
            return !isNaN(date.getTime()) && val.length > 8;
        });
        if (dateValues.length > values.length * 0.7) {
            return 'date';
        }

        // Check for booleans
        const boolValues = values.filter(val => 
            ['true', 'false', '1', '0', 'sim', 'não', 'yes', 'no'].includes(val.toString().toLowerCase())
        );
        if (boolValues.length > values.length * 0.8) {
            return 'boolean';
        }

        // Check for URLs
        const urlValues = values.filter(val => {
            try {
                new URL(val);
                return true;
            } catch {
                return false;
            }
        });
        if (urlValues.length > values.length * 0.7) {
            return 'url';
        }

        // Check for emails
        const emailValues = values.filter(val => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(val);
        });
        if (emailValues.length > values.length * 0.7) {
            return 'email';
        }

        return 'string';
    }

    static generateFieldDescription(fieldName) {
        const descriptions = {
            // IDs and codes
            'id': 'Identificador único do registro',
            'codigo': 'Código identificador',
            'cod': 'Código identificador',
            'chave': 'Chave identificadora',
            
            // Personal information
            'nome': 'Nome completo',
            'email': 'Endereço de email',
            'telefone': 'Número de telefone',
            'celular': 'Número de celular',
            'cpf': 'Cadastro de Pessoa Física',
            'cnpj': 'Cadastro Nacional de Pessoa Jurídica',
            'rg': 'Registro Geral',
            
            // Location
            'endereco': 'Endereço completo',
            'rua': 'Nome da rua',
            'numero': 'Número do endereço',
            'bairro': 'Nome do bairro',
            'cidade': 'Nome da cidade',
            'estado': 'Estado/UF',
            'cep': 'Código de Endereçamento Postal',
            'latitude': 'Coordenada de latitude',
            'longitude': 'Coordenada de longitude',
            'lat': 'Coordenada de latitude',
            'lng': 'Coordenada de longitude',
            
            // Dates and time
            'data': 'Data do registro',
            'datahora': 'Data e hora do registro',
            'timestamp': 'Carimbo de tempo',
            'datacriacao': 'Data de criação',
            'dataatualizacao': 'Data de atualização',
            'datavalidade': 'Data de validade',
            'prazo': 'Data limite ou prazo',
            
            // Status and categories
            'status': 'Status atual',
            'situacao': 'Situação atual',
            'tipo': 'Tipo ou categoria',
            'categoria': 'Categoria do item',
            'classe': 'Classificação',
            'grupo': 'Grupo ou agrupamento',
            
            // Values and quantities
            'valor': 'Valor monetário',
            'preco': 'Preço do item',
            'quantidade': 'Quantidade numérica',
            'qtd': 'Quantidade',
            'peso': 'Peso em unidade apropriada',
            'altura': 'Altura em unidade apropriada',
            'largura': 'Largura em unidade apropriada',
            'comprimento': 'Comprimento em unidade apropriada',
            
            // Descriptions and comments
            'descricao': 'Descrição detalhada',
            'observacao': 'Observação adicional',
            'observacoes': 'Observações adicionais',
            'comentario': 'Comentário',
            'nota': 'Nota explicativa',
            'detalhe': 'Detalhamento adicional',
            
            // Road-specific (DER-SP context)
            'rodovia': 'Identificação da rodovia',
            'km': 'Quilometragem',
            'quilometro': 'Posição quilométrica',
            'sentido': 'Sentido da via',
            'faixa': 'Número da faixa',
            'velocidade': 'Velocidade registrada',
            'trafego': 'Volume de tráfego',
            'pedagio': 'Valor do pedágio',
            'balanca': 'Identificação da balança',
            'peso_bruto': 'Peso bruto do veículo',
            'peso_liquido': 'Peso líquido da carga',
            'placa': 'Placa do veículo',
            'veiculo': 'Tipo de veículo',
            'eixos': 'Número de eixos',
            'multa': 'Valor da multa',
            'infracao': 'Tipo de infração'
        };

        const lowerField = fieldName.toLowerCase().replace(/[_\s-]/g, '');
        
        // Exact match
        if (descriptions[lowerField]) {
            return descriptions[lowerField];
        }

        // Partial match
        for (let key in descriptions) {
            if (lowerField.includes(key) || key.includes(lowerField)) {
                return descriptions[key];
            }
        }

        // Default
        return `Campo ${fieldName}`;
    }
}

// Export utilities
class ExportManager {
    static downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    static async exportToPDF(data, title = 'Dicionário de Dados') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'mm', 'a4');
        
        // Title
        doc.setFontSize(16);
        doc.text(title, 20, 20);
        
        // Subtitle with date
        doc.setFontSize(10);
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);
        
        // Prepare table data
        const headers = ['Arquivo', 'Campo', 'Tipo', 'Descrição', 'Obrigatório'];
        const tableData = data.map(row => [
            row.arquivo || '',
            row.campo || '',
            row.tipo || '',
            (row.descricao || '').substring(0, 50) + (row.descricao && row.descricao.length > 50 ? '...' : ''),
            row.obrigatorio || ''
        ]);
        
        // Add table
        doc.autoTable({
            head: [headers],
            body: tableData,
            startY: 40,
            styles: { 
                fontSize: 8,
                cellPadding: 2
            },
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 35 },
                2: { cellWidth: 25 },
                3: { cellWidth: 80 },
                4: { cellWidth: 25 }
            },
            margin: { left: 20, right: 20 }
        });
        
        return doc;
    }

    static exportToExcel(data, filename = 'dicionario_dados.xlsx') {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        
        // Set column widths
        const wscols = [
            { wch: 20 }, // arquivo
            { wch: 25 }, // campo
            { wch: 15 }, // tipo
            { wch: 50 }, // descricao
            { wch: 15 }, // exemplo
            { wch: 12 }, // obrigatorio
            { wch: 20 }, // tema
            { wch: 25 }  // responsavel
        ];
        ws['!cols'] = wscols;
        
        XLSX.utils.book_append_sheet(wb, ws, 'Dicionário');
        XLSX.writeFile(wb, filename);
    }
}

// UI Helpers
class UIHelpers {
    static showLoading(elementId, show = true) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = show ? 'flex' : 'none';
        }
    }

    static showAlert(message, type = 'info', containerId = null) {
        const alertClass = {
            'success': 'alert-success',
            'error': 'alert-danger',
            'warning': 'alert-warning',
            'info': 'alert-info'
        }[type] || 'alert-info';

        const icon = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-triangle',
            'warning': 'fas fa-exclamation-triangle',
            'info': 'fas fa-info-circle'
        }[type] || 'fas fa-info-circle';

        const alertHtml = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                <i class="${icon} me-2"></i>${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        const container = containerId ? document.getElementById(containerId) : document.querySelector('.container');
        if (container) {
            container.insertAdjacentHTML('afterbegin', alertHtml);
            
            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                const alert = container.querySelector('.alert');
                if (alert) {
                    alert.remove();
                }
            }, 5000);
        }
    }

    static updateProgressBar(progressBarId, percentage) {
        const progressBar = document.getElementById(progressBarId);
        if (progressBar) {
            progressBar.style.width = percentage + '%';
            progressBar.setAttribute('aria-valuenow', percentage);
        }
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static formatDate(dateString) {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch {
            return dateString;
        }
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Global instances
window.dataDictionary = new DataDictionary();
window.fileAnalyzer = FileAnalyzer;
window.exportManager = ExportManager;
window.uiHelpers = UIHelpers;
