# Clinique Vétérinaire - TP3

Application Web dynamique connectée à une base de données Oracle via ORDS.

## Structure

```text
clinique-projet/
├── index.html
├── proprietaires.html
├── animaux.html
├── veterinaires.html
├── consultations.html
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── shared.js
    ├── proprietaires.js
    ├── animaux.js
    ├── veterinaires.js
    └── consultations.js
```

## 1. Prérequis

- Oracle Database dans votre VM
- ORDS activé
- VS Code + extension Live Server

## 2. Préparer la base de données

1. Ouvrir Oracle SQL Developer
2. Exécuter le script SQL du TP2
3. Vérifier que les tables existent :
   - proprietaire
   - animal
   - veterinaire
   - consultation
   - traitement

## 3. Activer ORDS

Activer le schéma et les tables pour exposer les endpoints REST.

Exemples d'URLs :
- `http://localhost:8080/ords/clinique/proprietaire/`
- `http://localhost:8080/ords/clinique/animal/`
- `http://localhost:8080/ords/clinique/veterinaire/`
- `http://localhost:8080/ords/clinique/consultation/`
- `http://localhost:8080/ords/clinique/traitement/`

## 4. Configurer le frontend

Ouvrir `js/api.js` et ajuster si nécessaire :

```javascript
const BASE_URL = 'http://localhost:8080/ords/clinique';
```

## 5. Exécuter le projet

1. Ouvrir le dossier dans VS Code
2. Cliquer sur `index.html`
3. Lancer **Open with Live Server**
