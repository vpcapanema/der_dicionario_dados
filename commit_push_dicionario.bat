@echo off
REM Script executável para commit e push automático do dicionário de dados DER
cd /d %~dp0

echo Fazendo pull das últimas alterações...
git pull

echo Adicionando arquivos modificados...
git add .

echo Commitando alterações...
git commit -m "Atualização automática do dicionário de dados (json) e ajustes no repositório."

echo Enviando para o repositório remoto...
git push

echo Operação concluída!
pause
