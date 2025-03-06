# Étape 1: Utiliser une image Node.js comme base
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Compiler TypeScript
RUN npm run build

# Exposer le port utilisé par l'API
EXPOSE 5000

# Lancer l'application avec Node.js
CMD ["npm", "run", "start"]
