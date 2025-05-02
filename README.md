# CinemaRole


## Table des matières

* Présentation du projet
* Problèmes à résoudre / besoins exprimés
* Utilisateurs cibles et rôles
* Lien avec les technologies
* Fonctionnalités

  * Utilisateur simple
  * Administrateur
* User Stories
* Priorisation des fonctionnalités
* Planification du projet
* Outils nécessaires au développement
* Outils nécessaires à l'exploitation
* Contraintes techniques
* UML

## Présentation du projet

**Nom du projet :** CinemaRole
**Description :** Plateforme web interactive permettant aux utilisateurs de noter et de rédiger des critiques sur des films et des séries.
**Objectif principal :** Offrir aux passionnés de cinéma et de séries un espace communautaire pour partager leurs avis, consulter des critiques et découvrir de nouveaux contenus recommandés.

## Problèmes à résoudre / besoins exprimés

* Manque de plateformes locales francophones dédiées aux critiques.
* Difficulté à trouver des recommandations personnalisées.
* Besoin de centraliser critiques, notes et préférences.

**Attentes de l'utilisateur final :**

* Accéder rapidement aux avis d’autres utilisateurs.
* Partager ses propres critiques.
* Découvrir des œuvres recommandées selon ses goûts.

## Utilisateurs cibles et rôles

| Type d'utilisateur   | Description                     | Rôles et permissions                          |
| -------------------- | ------------------------------- | --------------------------------------------- |
| Visiteur non inscrit | Consulte librement les contenus | Voir fiches, notes, critiques                 |
| Utilisateur régulier | Membre inscrit                  | Compte, noter, commenter, favoris, rechercher |
| Administrateur       | Gère la plateforme              | Gérer les films, critiques, utilisateurs      |

## Lien avec les technologies

* **Laravel** : Middleware, policies (`can:manage-users`, `can:edit-reviews`, etc.)
* **React** : Routes protégées conditionnelles selon les rôles, redirections personnalisées

## Fonctionnalités

### Utilisateur simple

* Créer un compte / Connexion
* Consulter fiches de films/séries
* Laisser une note (1-5 étoiles)
* Rédiger/modifier/supprimer ses critiques
* Ajouter aux favoris
* Commenter
* Rechercher des contenus

### Administrateur

* Ajouter/modifier/supprimer films et séries
* Supprimer contenus inappropriés
* Gérer les comptes utilisateurs

## User Stories

* En tant que **visiteur**, je veux consulter des critiques pour décider si je veux m'inscrire.
* En tant qu'**utilisateur inscrit**, je veux noter et commenter des films/séries.
* En tant qu'**admin**, je veux gérer les contenus pour maintenir la qualité de la plateforme.

## Priorisation des fonctionnalités

| Fonctionnalité              | Priorité       |
| --------------------------- | -------------- |
| Inscription / Connexion     | 🟢 Essentielle |
| Notation & commentaires     | 🟢 Essentielle |
| Recherche de contenu        | 🟢 Essentielle |
| Gestion de profil / favoris | 🟢 Essentielle |
| Tableau de bord admin       | 🟢 Essentielle |
| Système de recommandations  | 🟡 Secondaire  |

## Planification du projet

### Liste des tâches à réaliser

#### Analyse et conception (4 jours)

* Création des diagrammes UML
* Maquettes UI
* Architecture du projet

#### Développement Back-End (5 jours)

* Initialisation Laravel + base de données
* Authentification (inscription/connexion)
* Routes API (films, critiques, utilisateurs)
* Middleware et policies (rôles)

#### Développement Front-End (5 jours)

* Initialisation React (Vite)
* Pages : Accueil, Connexion, Détail film, Dashboard
* Connexion API, affichage conditionnel (rôles)

#### Tests (2 jours)

* Tests fonctionnels et unitaires (back/front)
* Vérification des validations et sécurité

#### Déploiement (2 jours)

* Mise en ligne sur hébergeur
* Tests post-déploiement

## Outils nécessaires au développement

* **Langages / Frameworks** : PHP (Laravel), JS (React), MySQL
* **IDE** : VS Code
* **Environnement local** : XAMPP
* **Versioning** : Git + GitHub
* **Design/UI** : Figma, Bootstrap / Tailwind CSS
* **Icônes** : FontAwesome

## Outils nécessaires à l'exploitation

| Besoin                | Solution                            |
| --------------------- | ----------------------------------- |
| Hébergement           | 000webhost (ou Hostinger)           |
| Monitoring & logs     | Laravel Log                         |
| Sauvegarde de la base | Outils de sauvegarde auto/hébergeur |
| Sécurité              | SSL/TLS, middleware, validation     |

## Contraintes techniques

* Back-end : Laravel
* Front-end : React
* Base de données : MySQL
* Responsive : PC, tablette, smartphone
* Hébergement local en développement, en ligne ensuite

## UML

* Diagramme de cas d'utilisation
* Diagramme de classes
* Diagramme de séquence (si nécessaire)
