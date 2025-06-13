# Guia de Configuração do GitHub Pages

Este guia explica como configurar o GitHub Pages para o Dicionário de Dados DER-SP.

## 📋 Pré-requisitos

- Conta no GitHub
- Repositório criado no GitHub
- Arquivos do projeto enviados para o repositório

## 🚀 Passo a Passo

### 1. Configurar o Repositório

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**

### 2. Configurar Source

1. Em **Source**, selecione **Deploy from a branch**
2. Em **Branch**, selecione **main** (ou **master**)
3. Em **Folder**, selecione **/ (root)** se os arquivos estão na raiz, ou **/docs** se estão na pasta docs
4. Clique em **Save**

### 3. Configurar Custom Domain (Opcional)

Se você tem um domínio próprio:
1. Em **Custom domain**, digite seu domínio (ex: `dicionario.der.sp.gov.br`)
2. Marque **Enforce HTTPS**
3. Clique em **Save**

### 4. Aguardar Deploy

1. O GitHub processará os arquivos (pode levar alguns minutos)
2. Uma vez concluído, seu site estará disponível em:
   - `https://seu-usuario.github.io/nome-do-repositorio` (domínio padrão)
   - Ou no domínio customizado configurado

### 5. Configurar Actions (Automático)

O projeto já inclui um arquivo `.github/workflows/deploy.yml` que:
- Detecta automaticamente mudanças na branch main
- Faz build do Jekyll
- Publica automaticamente no GitHub Pages

## ⚙️ Configurações do Jekyll

O arquivo `docs/_config.yml` contém as configurações principais:

```yaml
title: "Dicionário de Dados DER-SP"
description: "Portal interativo do dicionário de dados abertos do DER-SP"
url: "https://seu-usuario.github.io"  # ← Altere para seu domínio
baseurl: "/der_dicionario_dados"       # ← Altere para o nome do seu repositório
```

### Personalizações Necessárias

1. **URL**: Altere para seu domínio GitHub Pages
2. **BaseURL**: Nome do seu repositório
3. **Repository URL**: Link para seu repositório

## 🔧 Solução de Problemas

### Site não carrega
- Verifique se o GitHub Pages está habilitado
- Confirme se a branch correta está selecionada
- Aguarde alguns minutos para o processamento

### CSS/JS não carregam
- Verifique os caminhos nos arquivos HTML
- Confirme se o `baseurl` está correto no `_config.yml`

### Arquivos CSV não carregam
- Verifique se os arquivos estão na pasta `dados/`
- Confirme se os nomes dos arquivos estão corretos
- Teste localmente primeiro

### Erro 404
- Verifique se o arquivo `index.md` ou `index.html` existe
- Confirme se o caminho no navegador está correto

## 🌐 URLs do Projeto

Após a configuração, seu projeto terá as seguintes URLs:

- **Página Principal**: `https://seu-usuario.github.io/repositorio/`
- **Consultar Dados**: `https://seu-usuario.github.io/repositorio/`
- **Publicar Dados**: `https://seu-usuario.github.io/repositorio/publicar.html`
- **Sobre**: `https://seu-usuario.github.io/repositorio/sobre.html`

## 🔄 Atualizações Automáticas

O projeto está configurado para atualizações automáticas:

1. Faça alterações nos arquivos
2. Commit e push para a branch `main`
3. GitHub Actions fará o deploy automaticamente
4. Site será atualizado em alguns minutos

## 📞 Suporte

Se encontrar problemas:

1. Verifique a [documentação oficial do GitHub Pages](https://docs.github.com/pt/pages)
2. Consulte os logs na aba **Actions** do seu repositório
3. Abra uma issue no repositório do projeto

## ✅ Checklist de Configuração

- [ ] Repositório criado no GitHub
- [ ] Arquivos enviados para o repositório
- [ ] GitHub Pages habilitado
- [ ] Branch correta selecionada
- [ ] `_config.yml` personalizado
- [ ] Site acessível na URL configurada
- [ ] Actions funcionando corretamente
- [ ] Dados CSV carregando na página
- [ ] Todas as funcionalidades testadas

## 🎯 Próximos Passos

Após a configuração:

1. **Teste todas as funcionalidades**
   - Consulta de dados
   - Filtros e busca
   - Exportação
   - Upload e publicação

2. **Personalize o conteúdo**
   - Adicione seus dados na pasta `dados/`
   - Atualize informações de contato
   - Customize cores e layout se necessário

3. **Divulgue o projeto**
   - Compartilhe a URL com sua equipe
   - Documente o processo interno
   - Treine usuários nas funcionalidades

4. **Monitore e mantenha**
   - Acompanhe atualizações dos dados
   - Monitore feedback dos usuários
   - Implemente melhorias conforme necessário
