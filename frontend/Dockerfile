# Étape 1: Utiliser une image Node.js comme base
FROM node:22 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2: Utiliser Nginx pour servir l'application
FROM nginx

# Copier les fichiers build de React vers le dossier Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 3000
EXPOSE 3000

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
