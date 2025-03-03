Projet Application Mobile


Front-end:
Objectifs:
Accueil et connexion : Accès via un compte client ou possibilité de réserver en invité.
Prise de rendez-vous : Affichage du calendrier des disponibilités de l’artisan, choix de la date et de l’heure, confirmation de réservation.
Gestion des rendez-vous : Consultation, modification ou annulation d’un rendez-vous.
QR Code : Affichage et redirection vers le téléchargement de l’application.
Technologies:
React Native  ou flutter
Génération via une bibliothèque dédiée (ex : QRCode.js).

Backend:
Objectifs:

Notifications : Rappels automatiques des rendez-vous par notification push.
wordpress


Technologies:

WordPress avec BookingPress.
API BookingPress pour récupérer et envoyer les données.
Firebase Cloud Messaging (FCM) pour les notifications push

1. Définir les fonctionnalités
Ton application doit permettre aux utilisateurs de :
Voir les services proposés
Réserver un créneau disponible
Payer en ligne ou sur place
Recevoir une confirmation de réservation
Voir l'historique des réservations

2. Choisir la stack technologique
Frontend : React Native (Expo ou CLI)
Backend : WordPress avec BookingPress (via REST API)
Base de données : MySQL (gérée par WordPress)
Authentification : Firebase Auth ou WordPress JWT

3. Installer et configurer BookingPress sur WordPress
Installe et active BookingPress sur ton WordPress.
Configure les services, les employés et les horaires de réservation.
Active l'API REST de WordPress et génère des clés API si nécessaire.
Teste l’API BookingPress via https://your-wordpress-site.com/wp-json/bookingpress/v1/.

Front 

Quel framework choisir ?
Critères
React Native
Flutter
🔗 Connexion à WordPress
✅ Meilleure intégration
⚠️ Moins d'outils disponibles
📅 Calendrier & DatePicker
⚠️ Dépend des composants natifs
✅ UI homogène et fluide
📲 Notifications push
✅ Bonne intégration
✅ Bonne intégration
📸 QR Code
✅ Bibliothèques dispo
✅ Bibliothèques dispo
🎨 UI et personnalisation
⚠️ Dépend des composants natifs
✅ Plus flexible et homogène

👉 Recommandation finale :
 React Native, car votre projet repose sur une intégration avec WordPress et BookingPress, où React Native offre plus de compatibilité et de ressources. 🚀



installer react native
Installer Node.js
installer expo CLi
créer un projet react native
executer la commande 
```npx create-expo-app NomDuProjet
accèder au dossier du projet
	```cd NomDuProjet```
démarrer l’application
```npm start``
Installer React Navigation et les dépendances :
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons



Difficulté rencontrés
Récupération de l’api rest
Avec bookingpress, impossible d’avoir accès à une api rest 

solution
trouver une autre extension wordpress

Awesome Support
Easy Appointments

Trouver une solution en créant un back modulable




Difficulté 2
Impossible de trouver une extension wordpress qui donne une api rest gratuitement.
Liste des “possibles solutions”


1. Créer une application modulaire et configurable
Stocker les configurations client dans un fichier JSON ou une base de données (Firebase, Supabase, ou un simple backend).
Utiliser un contexte global ou Redux pour charger la configuration à l'ouverture de l'application.
Exemple : un fichier config.json contenant le type de commerce, les couleurs, les libellés.
2. Gestion des rendez-vous
Backend gratuit : Supabase (PostgreSQL + API REST) ou Firebase (Realtime Database / Firestore).
Hébergement backend gratuit : Railway, Render, ou Vercel si tu optes pour un backend Node.js.
3. Génération d'applications personnalisées
Si chaque client veut une application distincte :
Utiliser EAS Build (Expo) pour générer des APK sans installer Xcode ou Android Studio.
Modifier dynamiquement les assets et styles via des fichiers de config.
Si une seule application universelle :
Un simple écran de login où le commerçant choisit son entreprise et charge sa configuration personnalisée.
4. Publication sur les Stores
Si chaque client veut son app sur le Play Store/App Store, il faudra un compte développeur (Google : 25€ à vie, Apple : 99€/an).
Alternative : leur fournir un APK ou les faire passer par un PWA si iOS n'est pas prioritaire. (Si réussite)



Création d’une appli test

Front

Permet de prendre des rendez vous, de sélectionner une date de rentrer son nom et son numéro de téléphone.



Implémentation du choix des services


