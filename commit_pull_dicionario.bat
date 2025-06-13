@echo off
REM Script para commit e pull do dicionario de dados DER
cd /d %~dp0

echo Fazendo pull das últimas alterações...
git pull

echo Adicionando arquivos modificados...
git add .

echo Commitando alterações...
git commit -m "Atualização do dicionario de dados (json) e ajustes no repositório."

echo Enviando para o repositório remoto...
git push

echo Operação concluída!
pause
