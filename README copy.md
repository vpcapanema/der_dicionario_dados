# Dicionário de Dados DER-SP

Este repositório reúne o dicionário de dados dos conjuntos abertos do DER-SP, com documentação, exemplos e arquivos para reuso e transparência.

## Estrutura do Repositório

- `dados/` — arquivos do dicionário de dados (CSV, XLSX, etc)
- `docs/` — documentação e site para GitHub Pages
- `README.md` — esta explicação
- `LICENSE` — licença de uso

## Sobre o Dicionário de Dados

O dicionário de dados segue as melhores práticas de documentação, incluindo:
- Nome do campo
- Tipo de dado
- Descrição clara
- Exemplo de valor
- Obrigatoriedade
- Domínio/valores possíveis
- Observações
- Informações sobre o formato bruto (estrutura física)
- Informações sobre a informação (semântica/conteúdo)
- Metadados do dataset (versão, frequência de atualização, responsável, licença, etc)

### Exemplo de colunas do dicionário

| arquivo        | campo        | tipo   | descricao              | exemplo      | obrigatorio | dominio/valores | observacoes | formato bruto | tipo de arquivo | estrutura | codificacao | separador | cabecalho | tamanho | n_registros | n_campos | chave primaria | tema     | cobertura temporal | cobertura geografica | finalidade      | limitacoes      | descricao do dado                  | versao | frequencia de atualizacao | data ultima atualizacao | responsavel     | licenca | fonte    | observacoes gerais |
|---------------|--------------|--------|------------------------|--------------|-------------|-----------------|------------|--------------|-----------------|-----------|-------------|-----------|-----------|---------|-------------|----------|----------------|----------|--------------------|---------------------|----------------|----------------|-------------------------------------|--------|--------------------------|------------------------|-----------------|---------|----------|-------------------|
| balancas.xlsx | COD_BALANCA  | string | Código da balança      | B123         | sim         |                 |            | tabular      | XLSX            | tabela    | UTF-8       |           | sim       | 2MB     | 1000        | 12       | id_balança     | rodovias | 2020-2024         | SP                  | fiscalização   | dados parciais | Dados de balanças rodoviárias DER-SP| 1.0    | anual                    | 2025-06-01             | DER-SP / TI     | CC-BY   | DER-SP   | Dados geoespaciais |

## Como contribuir

Sugestões, correções e colaborações são bem-vindas via issues ou pull requests.

## Licença

Este repositório está licenciado sob CC-BY 4.0.
