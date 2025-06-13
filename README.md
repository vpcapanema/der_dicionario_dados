# Dicionário de Dados DER-SP

Portal interativo para consulta e publicação de metadados dos conjuntos abertos do Departamento de Estradas de Rodagem do Estado de São Paulo.

🌐 **[Acesse o Portal](https://seu-usuario.github.io/der_dicionario_dados)**

## 🚀 Funcionalidades

### 📊 Consulta Interativa
- Interface moderna e responsiva
- Busca global em todos os campos
- Filtros avançados por arquivo, tipo, tema e obrigatoriedade
- Exportação em múltiplos formatos (CSV, Excel, PDF)
- Visualização detalhada de metadados
- Estatísticas em tempo real

### 📤 Publicação Assistida
- Upload de arquivos (CSV, XLSX, JSON)
- Análise automática de dados com IA
- Inferência inteligente de tipos e metadados
- Interface de edição manual para ajustes
- Geração automática do dicionário
- Validação de dados em tempo real

### 🛠 Características Técnicas
- 100% responsivo (desktop, tablet, mobile)
- Tecnologias modernas (HTML5, CSS3, JS ES6+)
- Sem dependência de servidor (GitHub Pages)
- Código aberto e extensível
- Padrões de acessibilidade

## 📁 Estrutura do Repositório

```
der_dicionario_dados/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automação GitHub Pages
├── dados/
│   ├── dicionario_ativos_rodoviarios_modelo_completo.xlsx
│   └── dicionario_dados_completo_exemplo.csv
├── docs/
│   ├── assets/
│   │   └── js/
│   │       └── dictionary.js   # Utilitários JavaScript
│   ├── _config.yml            # Configuração Jekyll
│   ├── index.md               # Página de consulta
│   ├── publicar.html          # Página de publicação
│   └── sobre.html             # Página sobre o projeto
├── LICENSE
└── README.md
```

## 🎯 Como Usar

### Para Consultar Dados
1. Acesse o [portal online](https://seu-usuario.github.io/der_dicionario_dados)
2. Use a busca global ou filtros específicos
3. Visualize detalhes clicando no ícone 👁
4. Exporte os resultados no formato desejado

### Para Publicar Novos Dados
1. Acesse a [página de publicação](https://seu-usuario.github.io/der_dicionario_dados/publicar.html)
2. Faça upload do seu arquivo (CSV, XLSX ou JSON)
3. Aguarde a análise automática
4. Complete os metadados necessários
5. Baixe o dicionário gerado
6. Adicione o arquivo à pasta `dados/` do repositório

## 📊 Sobre o Dicionário de Dados

O dicionário segue as melhores práticas de documentação de dados abertos, incluindo:

### Metadados de Campo
- **Nome do campo**: Identificação única
- **Tipo de dado**: string, int, float, date, boolean
- **Descrição**: Explicação clara do conteúdo
- **Exemplo**: Valor representativo
- **Obrigatoriedade**: sim/não
- **Domínio/valores**: Valores possíveis quando aplicável
- **Observações**: Informações adicionais

### Metadados do Dataset
- **Arquivo**: Nome e formato
- **Tema**: Categoria principal
- **Responsável**: Equipe ou pessoa responsável
- **Licença**: Termos de uso
- **Cobertura temporal**: Período dos dados
- **Cobertura geográfica**: Abrangência espacial
- **Frequência de atualização**: Periodicidade
- **Versão**: Controle de versão
- **Descrição do dataset**: Propósito e conteúdo

### Metadados Técnicos
- **Estrutura**: tabular, hierárquica, etc.
- **Codificação**: UTF-8, ASCII, etc.
- **Formato**: CSV, XLSX, JSON, etc.
- **Tamanho**: Dimensões do arquivo
- **Registros**: Quantidade de linhas
- **Campos**: Quantidade de colunas

## 🚀 Configuração e Deploy

### Pré-requisitos
- Repositório no GitHub
- GitHub Pages habilitado
- Arquivos de dados na pasta `dados/`

### Deploy Automático
O projeto inclui GitHub Actions para deploy automático:
1. Commit suas alterações
2. Push para a branch `main`
3. GitHub Actions fará o build e deploy automaticamente
4. Site estará disponível em `https://seu-usuario.github.io/repositorio`

### Configuração Local
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/der_dicionario_dados.git

# Entre na pasta docs
cd der_dicionario_dados/docs

# Serve localmente (requer Jekyll)
bundle exec jekyll serve
```

## 🛠 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com CSS Grid e Flexbox
- **JavaScript ES6+**: Funcionalidades interativas
- **Bootstrap 5**: Framework CSS responsivo
- **Font Awesome**: Ícones vetoriais

### Bibliotecas JavaScript
- **DataTables**: Tabelas interativas
- **Papa Parse**: Parser CSV robusto
- **SheetJS**: Manipulação de arquivos Excel
- **jsPDF**: Geração de PDFs
- **Chart.js**: Gráficos e visualizações

### Infraestrutura
- **GitHub Pages**: Hospedagem gratuita
- **Jekyll**: Gerador de sites estáticos
- **GitHub Actions**: CI/CD automatizado

## 🤝 Como Contribuir

### Reportar Problemas
- Abra uma [issue](https://github.com/seu-usuario/der_dicionario_dados/issues)
- Descreva o problema detalhadamente
- Inclua passos para reproduzir

### Contribuir com Código
1. Faça fork do repositório
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

### Melhorar Dados
- Ajude a documentar novos conjuntos de dados
- Melhore descrições existentes
- Padronize formatos e estruturas
- Valide a qualidade dos metadados

### Adicionar Funcionalidades
- Novos tipos de análise automática
- Formatos de exportação adicionais
- Melhorias na interface
- Integração com APIs externas

## 📋 Roadmap

### ✅ Concluído
- [x] Interface de consulta interativa
- [x] Sistema de filtros e busca
- [x] Exportação múltipla (CSV, Excel, PDF)
- [x] Página de publicação assistida
- [x] Análise automática de dados
- [x] Design responsivo

### 🚧 Em Desenvolvimento
- [ ] API REST para integração
- [ ] Sistema de versionamento
- [ ] Validação avançada de dados
- [ ] Dashboard analytics

### 🔮 Planejado
- [ ] Integração com CKAN
- [ ] Sistema de notificações
- [ ] Aplicativo mobile
- [ ] Machine Learning para classificação automática

## 📄 Licença

Este projeto está licenciado sob a [Licença Creative Commons BY 4.0](LICENSE).

### Você é livre para:
- ✅ **Compartilhar**: copiar e redistribuir em qualquer formato
- ✅ **Adaptar**: modificar, transformar e criar derivações
- ✅ **Uso comercial**: utilizar para fins comerciais

### Sob as seguintes condições:
- 📝 **Atribuição**: dar crédito apropriado aos autores

## 📞 Contato

- **DER-SP**: dadosabertos@der.sp.gov.br
- **Site**: https://www.der.sp.gov.br
- **GitHub**: https://github.com/der-sp
- **Portal de Dados**: https://dados.der.sp.gov.br

## 📈 Estatísticas

- 📊 15+ conjuntos de dados documentados
- 📝 200+ campos catalogados
- 🔄 Atualização contínua
- 💻 100% código aberto
- 🌐 Acesso público irrestrito

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe DER-SP</p>
  <p>
    <a href="https://www.der.sp.gov.br">🌐 Site Oficial</a> •
    <a href="https://dados.der.sp.gov.br">📊 Portal de Dados</a> •
    <a href="https://github.com/der-sp">💻 GitHub</a>
  </p>
</div>
