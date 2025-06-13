// Enhanced publishing functionality
class DataPublisher {
    constructor() {
        this.supportedFormats = ['csv', 'xlsx', 'xls', 'json'];
        this.analysisResults = {};
        this.currentStep = 1;
        this.dictionaryData = [];
        this.globalMetadata = {};
    }

    // Advanced file type detection
    detectFileType(file) {
        const extension = file.name.split('.').pop().toLowerCase();
        const mimeType = file.type.toLowerCase();
        
        const typeMap = {
            'csv': ['csv', 'text/csv', 'application/csv'],
            'xlsx': ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            'xls': ['xls', 'application/vnd.ms-excel'],
            'json': ['json', 'application/json', 'text/json']
        };

        for (let [type, identifiers] of Object.entries(typeMap)) {
            if (identifiers.includes(extension) || identifiers.includes(mimeType)) {
                return type;
            }
        }

        return 'unknown';
    }

    // Enhanced data type inference
    inferAdvancedDataType(values, fieldName) {
        if (!values || values.length === 0) return 'string';

        const cleanValues = values.filter(val => val != null && val !== '').map(val => val.toString().trim());
        if (cleanValues.length === 0) return 'string';

        // Field name-based hints
        const fieldHints = this.getFieldTypeHints(fieldName);
        
        // Pattern-based detection
        const patterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            url: /^https?:\/\/.+/,
            phone: /^[\+]?[1-9][\d]{0,15}$/,
            cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
            cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/,
            cep: /^\d{5}-?\d{3}$/,
            currency: /^\R?\$?\s?\d+[.,]?\d*$/,
            coordinate: /^-?\d+\.\d+$/,
            time: /^\d{1,2}:\d{2}(:\d{2})?$/
        };

        // Check patterns
        for (let [type, pattern] of Object.entries(patterns)) {
            const matches = cleanValues.filter(val => pattern.test(val)).length;
            if (matches > cleanValues.length * 0.7) {
                return type;
            }
        }

        // Check for numbers
        const numericValues = cleanValues.filter(val => !isNaN(parseFloat(val)) && isFinite(val));
        if (numericValues.length > cleanValues.length * 0.8) {
            // Check for currency indicators
            if (fieldName.toLowerCase().includes('valor') || 
                fieldName.toLowerCase().includes('preco') ||
                fieldName.toLowerCase().includes('custo')) {
                return 'currency';
            }
            
            // Check for coordinates
            if (fieldName.toLowerCase().includes('lat') || 
                fieldName.toLowerCase().includes('long') ||
                fieldName.toLowerCase().includes('coord')) {
                return 'coordinate';
            }
            
            const hasDecimals = numericValues.some(val => val.toString().includes('.') || val.toString().includes(','));
            return hasDecimals ? 'float' : 'integer';
        }

        // Check for dates
        const dateValues = cleanValues.filter(val => {
            const date = new Date(val);
            return !isNaN(date.getTime()) && val.length >= 8;
        });
        if (dateValues.length > cleanValues.length * 0.7) {
            // Check if includes time
            const hasTime = cleanValues.some(val => val.includes(':'));
            return hasTime ? 'datetime' : 'date';
        }

        // Check for booleans
        const booleanValues = ['true', 'false', '1', '0', 'sim', 'não', 'yes', 'no', 'ativo', 'inativo'];
        const boolMatches = cleanValues.filter(val => 
            booleanValues.includes(val.toLowerCase())
        ).length;
        if (boolMatches > cleanValues.length * 0.8) {
            return 'boolean';
        }

        // Check field hints
        if (fieldHints) {
            return fieldHints;
        }

        return 'string';
    }

    getFieldTypeHints(fieldName) {
        const hints = {
            'id': 'integer',
            'codigo': 'string',
            'nome': 'string',
            'email': 'email',
            'telefone': 'phone',
            'cpf': 'cpf',
            'cnpj': 'cnpj',
            'cep': 'cep',
            'latitude': 'coordinate',
            'longitude': 'coordinate',
            'data': 'date',
            'hora': 'time',
            'datahora': 'datetime',
            'valor': 'currency',
            'preco': 'currency',
            'custo': 'currency',
            'url': 'url',
            'link': 'url',
            'status': 'string',
            'tipo': 'string'
        };

        const lowerField = fieldName.toLowerCase();
        for (let [key, type] of Object.entries(hints)) {
            if (lowerField.includes(key)) {
                return type;
            }
        }

        return null;
    }

    // Generate enhanced field description
    generateEnhancedDescription(fieldName, dataType, sampleValues) {
        const baseDescription = FileAnalyzer.generateFieldDescription(fieldName);
        
        // Add type-specific information
        const typeInfo = {
            email: 'endereço de email válido',
            phone: 'número de telefone',
            cpf: 'CPF no formato XXX.XXX.XXX-XX',
            cnpj: 'CNPJ no formato XX.XXX.XXX/XXXX-XX',
            cep: 'CEP no formato XXXXX-XXX',
            coordinate: 'coordenada geográfica em decimal',
            currency: 'valor monetário em reais',
            url: 'endereço URL válido',
            datetime: 'data e hora no formato YYYY-MM-DD HH:MM:SS',
            date: 'data no formato YYYY-MM-DD',
            time: 'horário no formato HH:MM:SS'
        };

        if (typeInfo[dataType]) {
            return `${baseDescription} (${typeInfo[dataType]})`;
        }

        return baseDescription;
    }

    // Calculate data quality metrics
    calculateDataQuality(data, fieldName) {
        const values = data.map(row => row[fieldName]);
        const nonNullValues = values.filter(val => val != null && val !== '');
        
        return {
            completeness: (nonNullValues.length / values.length * 100).toFixed(1),
            uniqueness: (new Set(nonNullValues).size / nonNullValues.length * 100).toFixed(1),
            consistency: this.calculateConsistency(nonNullValues),
            validity: this.calculateValidity(nonNullValues, fieldName)
        };
    }

    calculateConsistency(values) {
        // Check format consistency
        if (values.length === 0) return 100;
        
        const formats = values.map(val => this.getValueFormat(val));
        const uniqueFormats = new Set(formats);
        
        return ((1 - (uniqueFormats.size - 1) / values.length) * 100).toFixed(1);
    }

    calculateValidity(values, fieldName) {
        // Check if values match expected patterns for the field type
        if (values.length === 0) return 100;
        
        const expectedType = this.getFieldTypeHints(fieldName);
        if (!expectedType) return 100;
        
        const patterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\+]?[1-9][\d]{0,15}$/,
            cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
            cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/,
            cep: /^\d{5}-?\d{3}$/
        };
        
        if (patterns[expectedType]) {
            const validCount = values.filter(val => patterns[expectedType].test(val)).length;
            return (validCount / values.length * 100).toFixed(1);
        }
        
        return 100;
    }

    getValueFormat(value) {
        const str = value.toString();
        // Simplified format detection
        if (/^\d+$/.test(str)) return 'numeric';
        if (/^\d+\.\d+$/.test(str)) return 'decimal';
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return 'date';
        if (/^[A-Z]+$/.test(str)) return 'uppercase';
        if (/^[a-z]+$/.test(str)) return 'lowercase';
        return 'mixed';
    }

    // Generate data profiling report
    generateDataProfile(data, fileName) {
        if (!data || data.length === 0) return null;

        const profile = {
            fileName: fileName,
            recordCount: data.length,
            fieldCount: Object.keys(data[0]).length,
            fileSize: this.estimateFileSize(data),
            fields: {},
            recommendations: [],
            qualityScore: 0
        };

        const fields = Object.keys(data[0]);
        let totalQualityScore = 0;

        fields.forEach(field => {
            const values = data.map(row => row[field]).filter(val => val != null && val !== '');
            const dataType = this.inferAdvancedDataType(values, field);
            const quality = this.calculateDataQuality(data, field);
            
            profile.fields[field] = {
                name: field,
                type: dataType,
                sampleValue: values[0] || '',
                uniqueCount: new Set(values).size,
                nullCount: data.length - values.length,
                quality: quality,
                description: this.generateEnhancedDescription(field, dataType, values.slice(0, 5)),
                domain: this.extractDomain(values),
                patterns: this.identifyPatterns(values),
                statistics: this.calculateFieldStatistics(values, dataType)
            };

            totalQualityScore += parseFloat(quality.completeness);
        });

        profile.qualityScore = (totalQualityScore / fields.length).toFixed(1);
        profile.recommendations = this.generateRecommendations(profile);

        return profile;
    }

    estimateFileSize(data) {
        // Rough estimation of JSON size
        const jsonString = JSON.stringify(data);
        const sizeInBytes = new Blob([jsonString]).size;
        return this.formatFileSize(sizeInBytes);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    extractDomain(values) {
        if (!values || values.length === 0) return '';
        
        const uniqueValues = [...new Set(values)];
        
        // Only return domain if it's a reasonable set
        if (uniqueValues.length <= 20 && uniqueValues.length > 1) {
            return uniqueValues.slice(0, 10).join(', ');
        }
        
        return '';
    }

    identifyPatterns(values) {
        if (!values || values.length === 0) return [];
        
        const patterns = [];
        const sample = values.slice(0, 100);
        
        // Check common patterns
        if (sample.every(val => /^[A-Z]{2,3}-\d+$/.test(val))) {
            patterns.push('Código alfanumérico (XX-999)');
        }
        
        if (sample.every(val => /^\d{4}-\d{2}-\d{2}$/.test(val))) {
            patterns.push('Data ISO (YYYY-MM-DD)');
        }
        
        return patterns;
    }

    calculateFieldStatistics(values, dataType) {
        const stats = {};
        
        if (['integer', 'float', 'currency', 'coordinate'].includes(dataType)) {
            const numericValues = values.map(val => parseFloat(val)).filter(val => !isNaN(val));
            if (numericValues.length > 0) {
                stats.min = Math.min(...numericValues);
                stats.max = Math.max(...numericValues);
                stats.mean = (numericValues.reduce((a, b) => a + b, 0) / numericValues.length).toFixed(2);
                stats.median = this.calculateMedian(numericValues);
            }
        }
        
        if (dataType === 'string') {
            const lengths = values.map(val => val.toString().length);
            stats.minLength = Math.min(...lengths);
            stats.maxLength = Math.max(...lengths);
            stats.avgLength = (lengths.reduce((a, b) => a + b, 0) / lengths.length).toFixed(1);
        }
        
        return stats;
    }

    calculateMedian(numbers) {
        const sorted = numbers.slice().sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return ((sorted[middle - 1] + sorted[middle]) / 2).toFixed(2);
        }
        
        return sorted[middle].toFixed(2);
    }

    generateRecommendations(profile) {
        const recommendations = [];
        
        // Quality-based recommendations
        if (parseFloat(profile.qualityScore) < 80) {
            recommendations.push({
                type: 'warning',
                message: 'Qualidade geral dos dados abaixo de 80%. Considere limpeza dos dados.',
                priority: 'high'
            });
        }
        
        // Field-specific recommendations
        Object.values(profile.fields).forEach(field => {
            if (parseFloat(field.quality.completeness) < 90) {
                recommendations.push({
                    type: 'info',
                    message: `Campo "${field.name}" tem ${field.quality.completeness}% de completude. Considere verificar valores nulos.`,
                    priority: 'medium'
                });
            }
            
            if (field.type === 'string' && field.statistics.maxLength > 255) {
                recommendations.push({
                    type: 'info',
                    message: `Campo "${field.name}" tem valores muito longos. Considere usar tipo TEXT.`,
                    priority: 'low'
                });
            }
        });
        
        return recommendations;
    }

    // Substituir toda a lógica de exportação e envio para trabalhar apenas com o arquivo dicionario_dados.json
}

// Global publisher instance
window.dataPublisher = new DataPublisher();
