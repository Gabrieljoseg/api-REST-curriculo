# Use uma imagem Node.js como base
FROM node:14

 

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

 

# Copie o package.json e package-lock.json primeiro para aproveitar o cache do Docker
COPY package*.json ./

 

# Instale as dependências
RUN npm install

 

# Copie o resto dos arquivos do projeto
COPY . .

 

# Exponha a porta que o Express está usando
EXPOSE 3000

 

# Comando para rodar a aplicação
CMD ["node", "index.js"]