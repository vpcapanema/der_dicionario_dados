---
layout: default
title: "Consultar Dicionário"
---

<!-- Arquivo desativado para evitar conflito com index.html -->
<!-- Conteúdo antigo preservado apenas para referência -->

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dicionário de Dados DER-SP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #1e3a8a;
            --secondary-color: #3b82f6;
            --accent-color: #f59e0b;
            --bg-light: #f8fafc;
            --text-dark: #1e293b;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, var(--bg-light) 0%, #e2e8f0 100%);
            min-height: 100vh;
        }

        .navbar {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .navbar-brand {
            font-weight: 700;
            font-size: 1.5rem;
        }

        .hero-section {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: white;
            padding: 4rem 0;
            margin-bottom: 3rem;
        }

        .hero-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            opacity: 0.9;
        }

        .search-section {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }

        .filter-card {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            margin-bottom: 1.5rem;
        }

        .data-table-container {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            border: none;
            border-radius: 8px;
            padding: 0.5rem 1.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }

        .btn-accent {
            background: linear-gradient(135deg, var(--accent-color) 0%, #f97316 100%);
            border: none;
            color: white;
            border-radius: 8px;
            padding: 0.5rem 1.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-accent:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(245, 158, 11, 0.4);
            color: white;
        }

        .form-control {
            border-radius: 8px;
            border: 2px solid #e2e8f0;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            border-color: var(--secondary-color);
            box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
        }

        .stats-card {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease;
        }

        .stats-card:hover {
            transform: translateY(-5px);
        }

        .stats-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--secondary-color);
        }

        .stats-label {
            color: var(--text-dark);
            font-weight: 500;
        }

        #dataTable {
            font-size: 0.9rem;
        }

        #dataTable th {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: white;
            font-weight: 600;
            border: none;
            padding: 1rem 0.75rem;
        }

        #dataTable tbody tr:hover {
            background-color: rgba(59, 130, 246, 0.05);
        }

        .tag {
            display: inline-block;
            background: var(--secondary-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            margin: 0.1rem;
        }

        .export-section {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .loading-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }

        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #e2e8f0;
            border-top: 5px solid var(--secondary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .hero-title {
                font-size: 2rem;
            }
            
            .search-section, .data-table-container {
                padding: 1rem;
            }
            
            .export-section {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loadingOverlay">
        <div class="spinner"></div>
    </div>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fas fa-database me-2"></i>DER-SP Data</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#"><i class="fas fa-search me-1"></i>Consultar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="publicar.html"><i class="fas fa-upload me-1"></i>Publicar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="sobre.html"><i class="fas fa-info-circle me-1"></i>Sobre</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container text-center">
            <h1 class="hero-title">Dicionário de Dados DER-SP</h1>
            <p class="hero-subtitle">Portal interativo para consulta e publicação de metadados dos conjuntos abertos</p>
        </div>
    </section>

    <div class="container">
        <!-- Statistics Cards -->
        <div class="row mb-4">
            <div class="col-md-3 mb-3">
                <div class="stats-card">
                    <div class="stats-number" id="totalDatasets">-</div>
                    <div class="stats-label">Conjuntos</div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card">
                    <div class="stats-number" id="totalFields">-</div>
                    <div class="stats-label">Campos</div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card">
                    <div class="stats-number" id="totalFiles">-</div>
                    <div class="stats-label">Arquivos</div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="stats-card">
                    <div class="stats-number" id="lastUpdate">-</div>
                    <div class="stats-label">Última Atualização</div>
                </div>
            </div>
        </div>

        <!-- Search and Filters -->
        <div class="search-section">
            <div class="row">
                <div class="col-md-6">
                    <label class="form-label fw-bold"><i class="fas fa-search me-2"></i>Busca Global</label>
                    <input type="text" class="form-control" id="globalSearch" placeholder="Digite para buscar em todos os campos...">
                </div>
                <div class="col-md-3">
                    <label class="form-label fw-bold"><i class="fas fa-file me-2"></i>Arquivo</label>
                    <select class="form-control" id="fileFilter">
                        <option value="">Todos os arquivos</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label fw-bold"><i class="fas fa-tag me-2"></i>Tipo</label>
                    <select class="form-control" id="typeFilter">
                        <option value="">Todos os tipos</option>
                    </select>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4">
                    <label class="form-label fw-bold"><i class="fas fa-folder me-2"></i>Tema</label>
                    <select class="form-control" id="themeFilter">
                        <option value="">Todos os temas</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label fw-bold"><i class="fas fa-check-circle me-2"></i>Obrigatório</label>
                    <select class="form-control" id="requiredFilter">
                        <option value="">Todos</option>
                        <option value="sim">Sim</option>
                        <option value="não">Não</option>
                    </select>
                </div>
                <div class="col-md-4 d-flex align-items-end">
                    <button class="btn btn-outline-secondary me-2" onclick="clearFilters()">
                        <i class="fas fa-times me-1"></i>Limpar Filtros
                    </button>
                    <button class="btn btn-accent" onclick="exportData()">
                        <i class="fas fa-download me-1"></i>Exportar
                    </button>
                </div>
            </div>
        </div>

        <!-- Data Table -->
        <div class="data-table-container">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3><i class="fas fa-table me-2"></i>Dicionário de Dados</h3>
                <div class="export-section">
                    <button class="btn btn-outline-primary btn-sm" onclick="exportCSV()">
                        <i class="fas fa-file-csv me-1"></i>CSV
                    </button>
                    <button class="btn btn-outline-success btn-sm" onclick="exportExcel()">
                        <i class="fas fa-file-excel me-1"></i>Excel
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="exportPDF()">
                        <i class="fas fa-file-pdf me-1"></i>PDF
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table id="dataTable" class="table table-hover">
                    <thead>
                        <tr>
                            <th>Arquivo</th>
                            <th>Campo</th>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th>Exemplo</th>
                            <th>Obrigatório</th>
                            <th>Tema</th>
                            <th>Responsável</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="dataTableBody">
                        <!-- Data will be loaded here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

    <script>
        let dataTable;
        let originalData = [];

        // Load data when page loads
        $(document).ready(function() {
            loadData();
        });

        async function loadData() {
            showLoading(true);
            
            try {
                // Load CSV data
                const response = await fetch('../dados/dicionario_dados_completo_exemplo.csv');
                const csvText = await response.text();
                
                // Parse CSV
                const lines = csvText.split('\n');
                const headers = lines[0].split(',');
                const data = [];
                
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = parseCSVLine(lines[i]);
                        const row = {};
                        headers.forEach((header, index) => {
                            row[header] = values[index] || '';
                        });
                        data.push(row);
                    }
                }
                
                originalData = data;
                initializeTable(data);
                updateStatistics(data);
                populateFilters(data);
                
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                showError('Erro ao carregar os dados. Verifique se o arquivo CSV existe.');
            }
            
            showLoading(false);
        }

        function parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    result.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            result.push(current);
            return result;
        }

        function initializeTable(data) {
            const tbody = document.getElementById('dataTableBody');
            tbody.innerHTML = '';
            
            data.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><span class="tag">${row.arquivo || '-'}</span></td>
                    <td><strong>${row.campo || '-'}</strong></td>
                    <td><span class="badge bg-info">${row.tipo || '-'}</span></td>
                    <td>${row.descricao || '-'}</td>
                    <td><code>${row.exemplo || '-'}</code></td>
                    <td><span class="badge ${row.obrigatorio === 'sim' ? 'bg-success' : 'bg-warning'}">${row.obrigatorio || '-'}</span></td>
                    <td>${row.tema || '-'}</td>
                    <td>${row.responsavel || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="viewDetails(${index})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Initialize DataTable
            if (dataTable) {
                dataTable.destroy();
            }
            
            dataTable = $('#dataTable').DataTable({
                responsive: true,
                pageLength: 25,
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
                },
                columnDefs: [
                    { orderable: false, targets: 8 }
                ]
            });
        }

        function updateStatistics(data) {
            const uniqueFiles = [...new Set(data.map(row => row.arquivo))].length;
            const totalFields = data.length;
            const uniqueDatasets = [...new Set(data.map(row => row.tema))].length;
            
            // Get latest update date
            const dates = data.map(row => row['data ultima atualizacao']).filter(date => date);
            const latestDate = dates.length > 0 ? new Date(Math.max(...dates.map(d => new Date(d)))).toLocaleDateString('pt-BR') : 'N/A';
            
            document.getElementById('totalDatasets').textContent = uniqueDatasets;
            document.getElementById('totalFields').textContent = totalFields;
            document.getElementById('totalFiles').textContent = uniqueFiles;
            document.getElementById('lastUpdate').textContent = latestDate;
        }

        function populateFilters(data) {
            // Populate file filter
            const files = [...new Set(data.map(row => row.arquivo))].sort();
            const fileFilter = document.getElementById('fileFilter');
            fileFilter.innerHTML = '<option value="">Todos os arquivos</option>';
            files.forEach(file => {
                if (file) {
                    fileFilter.innerHTML += `<option value="${file}">${file}</option>`;
                }
            });

            // Populate type filter
            const types = [...new Set(data.map(row => row.tipo))].sort();
            const typeFilter = document.getElementById('typeFilter');
            typeFilter.innerHTML = '<option value="">Todos os tipos</option>';
            types.forEach(type => {
                if (type) {
                    typeFilter.innerHTML += `<option value="${type}">${type}</option>`;
                }
            });

            // Populate theme filter
            const themes = [...new Set(data.map(row => row.tema))].sort();
            const themeFilter = document.getElementById('themeFilter');
            themeFilter.innerHTML = '<option value="">Todos os temas</option>';
            themes.forEach(theme => {
                if (theme) {
                    themeFilter.innerHTML += `<option value="${theme}">${theme}</option>`;
                }
            });
        }

        // Global search
        document.getElementById('globalSearch').addEventListener('input', function() {
            if (dataTable) {
                dataTable.search(this.value).draw();
            }
        });

        // Filter events
        ['fileFilter', 'typeFilter', 'themeFilter', 'requiredFilter'].forEach(filterId => {
            document.getElementById(filterId).addEventListener('change', applyFilters);
        });

        function applyFilters() {
            if (!dataTable) return;
            
            const fileFilter = document.getElementById('fileFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;
            const themeFilter = document.getElementById('themeFilter').value;
            const requiredFilter = document.getElementById('requiredFilter').value;
            
            let filteredData = originalData;
            
            if (fileFilter) {
                filteredData = filteredData.filter(row => row.arquivo === fileFilter);
            }
            if (typeFilter) {
                filteredData = filteredData.filter(row => row.tipo === typeFilter);
            }
            if (themeFilter) {
                filteredData = filteredData.filter(row => row.tema === themeFilter);
            }
            if (requiredFilter) {
                filteredData = filteredData.filter(row => row.obrigatorio === requiredFilter);
            }
            
            initializeTable(filteredData);
        }

        function clearFilters() {
            document.getElementById('globalSearch').value = '';
            document.getElementById('fileFilter').value = '';
            document.getElementById('typeFilter').value = '';
            document.getElementById('themeFilter').value = '';
            document.getElementById('requiredFilter').value = '';
            initializeTable(originalData);
        }

        function viewDetails(index) {
            const item = originalData[index];
            let detailsHtml = '<div class="row">';
            
            Object.keys(item).forEach(key => {
                if (item[key]) {
                    detailsHtml += `
                        <div class="col-md-6 mb-2">
                            <strong>${key}:</strong><br>
                            <span class="text-muted">${item[key]}</span>
                        </div>
                    `;
                }
            });
            
            detailsHtml += '</div>';
            
            // Create modal
            const modalHtml = `
                <div class="modal fade" id="detailsModal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Detalhes do Campo: ${item.campo}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                ${detailsHtml}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Remove existing modal
            const existingModal = document.getElementById('detailsModal');
            if (existingModal) {
                existingModal.remove();
            }
            
            // Add new modal
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
            modal.show();
        }

        function exportCSV() {
            const currentData = dataTable ? dataTable.rows({search: 'applied'}).data().toArray() : [];
            const csvContent = convertToCSV(currentData);
            downloadFile(csvContent, 'dicionario_dados.csv', 'text/csv');
        }

        function exportExcel() {
            const currentData = dataTable ? dataTable.rows({search: 'applied'}).data().toArray() : [];
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(originalData);
            XLSX.utils.book_append_sheet(wb, ws, 'Dicionário');
            XLSX.writeFile(wb, 'dicionario_dados.xlsx');
        }

        function exportPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('l', 'mm', 'a4');
            
            doc.setFontSize(16);
            doc.text('Dicionário de Dados DER-SP', 20, 20);
            
            const headers = ['Arquivo', 'Campo', 'Tipo', 'Descrição', 'Obrigatório'];
            const data = originalData.map(row => [
                row.arquivo || '',
                row.campo || '',
                row.tipo || '',
                (row.descricao || '').substring(0, 50) + '...',
                row.obrigatorio || ''
            ]);
            
            doc.autoTable({
                head: [headers],
                body: data,
                startY: 30,
                styles: { fontSize: 8 },
                columnStyles: {
                    3: { cellWidth: 80 }
                }
            });
            
            doc.save('dicionario_dados.pdf');
        }

        function convertToCSV(data) {
            if (data.length === 0) return '';
            
            const headers = Object.keys(originalData[0]);
            const csvRows = [headers.join(',')];
            
            originalData.forEach(row => {
                const values = headers.map(header => {
                    const value = row[header] || '';
                    return `"${value.toString().replace(/"/g, '""')}"`;
                });
                csvRows.push(values.join(','));
            });
            
            return csvRows.join('\n');
        }

        function downloadFile(content, filename, contentType) {
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

        function showLoading(show) {
            const overlay = document.getElementById('loadingOverlay');
            overlay.style.display = show ? 'flex' : 'none';
        }

        function showError(message) {
            const alertHtml = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            document.querySelector('.container').insertAdjacentHTML('afterbegin', alertHtml);
        }
    </script>
</body>
</html>
