# **Agent Conversationnel - Frontend**

Ce projet est l'interface frontend de notre agent conversationnel éducatif. Il utilise React et SCSS pour offrir une expérience utilisateur moderne et personnalisée.

## **Structure et Architecture**

Le projet est organisé de manière modulaire pour faciliter la maintenance et l'évolutivité.

### **Arborescence du Projet**

```plaintext
src/
├── components/         # Composants réutilisables
│   ├── AgentList.jsx
│   ├── ChatWindow.jsx
│   ├── ConversationsList.jsx
│   ├── Header.jsx
│   ├── Message.jsx
│   ├── MessageInput.jsx
│   └── Sidebar.jsx
├── pages/              # Pages principales
│   ├── ChatPage.jsx
│   └── HomePage.jsx
├── services/           # Services pour les appels API
│   └── api.js
├── styles/             # Fichiers SCSS organisés par composant/page
│   ├── AgentList.scss
│   ├── ChatPage.scss
│   ├── ChatWindow.scss
│   ├── ConversationsList.scss
│   ├── Header.scss
│   ├── MessageInput.scss
│   ├── Sidebar.scss
│   ├── settings.scss   # Variables SCSS globales
│   ├── variables.scss  # Variables spécifiques (ex : couleurs, breakpoints)
│   └── index.scss      # Import centralisé des styles
├── App.js              # Point d'entrée principal de l'application
├── index.js            # Point d'entrée React
└── clippyjs.d.ts       # Types pour la bibliothèque ClippyJS
```

---

## **Description des Composants**

### **1. AgentList**

- **Rôle** : Affiche une liste d'agents conversationnels disponibles (ex. Maths, Français, Histoire).
- **Style associé** : `AgentList.scss`

### **2. sdfChatWindows**

- **Rôle** : Affiche l'historique des messages sous forme de conversation.
- **Fonctionnalité** : Inclut un défilement fluide automatique au chargement et à l'ajout de nouveaux messages.
- **Style associé** : `ChatWindow.scss`

### **3. ConversationsList**

- **Rôle** : Liste des conversations enregistrées.
- **Fonctionnalité** : Permet de sélectionner ou de créer une nouvelle session de conversation.
- **Style associé** : `ConversationsList.scss`

### **4. Header**

- **Rôle** : Barre supérieure de navigation affichant le nom de l'utilisateur et un menu déroulant.
- **Fonctionnalité** : Inclut un bouton de déconnexion.
- **Style associé** : `Header.scss`

### **5. ChatWindow**

- **Rôle** : Affiche un message individuel (utilisateur ou assistant) avec un formatage markdown si nécessaire.
- **Style associé** : Aucun spécifique (intégré à `ChatWindow.scss`).

### **6. MessageInput**

- **Rôle** : Champ de saisie pour envoyer un message.
- **Fonctionnalité** : Désactive l'envoi lorsque le message est vide ou que l'envoi est en cours.
- **Style associé** : `MessageInput.scss`

### **7. Sidebar**

- **Rôle** : Barre latérale regroupant les composants `ConversationsList` et `AgentList`.
- **Style associé** : `Sidebar.scss`

---

## **Pages**

### **1. ChatPage**

- **Description** : Page principale où l'utilisateur interagit avec l'agent conversationnel.
- **Structure** :
  - `Header` (haut de la page)
  - `Sidebar` (à gauche)
  - `ChatWindow` et `MessageInput` (au centre)
- **Style associé** : `ChatPage.scss`

### **2. HomePage**

- **Description** : Page d'accueil du projet (), servant de point d'entrée, n'a pas de fonctionnalités particulières.
- **Fonctionnalité** : Contient un lien pour accéder à la `ChatPage`.

---

## **Architecture SCSS**

- Chaque composant ou page a son propre fichier SCSS.
- Les fichiers SCSS incluent uniquement les styles nécessaires au composant ou à la page concernée.
- Les variables globales (couleurs, breakpoints, etc.) sont définies dans `variables.scss` et importées dans chaque fichier.
- `index.scss` centralise l'import de tous les styles.

### **Variables principales (dans **variable.scss**)**

- **Couleurs** :
  ```scss
  $primary-color: #145da0;
  $secondary-color: #0c2d48;
  $accent-color: #2e8bc0;
  $background-color: #b1d4e0;
  ```

---

## **Initialisation du Projet**

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/Xolitor/chatbot-frontend.git
   cd chatbot-frontend
   ```

2. **Installer les dépendances :**

   ```bash
   npm install
   ```

3. **Lancer le serveur backend :**

   - Assurez-vous que le backend est configuré et démarré (instructions spécifiques au backend).

4. **Lancer le serveur frontend :**

   ```bash
   npm start
   ```

   - L'application sera accessible sur `http://localhost:3000`.

---

## **Démarrage**

- Ouvrez `http://localhost:3000` dans votre navigateur.
- Utilisez l'interface pour démarrer une nouvelle conversation ou accéder à une session existante.
