#  CinemaRole

**CinemaRole** est une plateforme web interactive dédiée aux passionnés de films et de séries. Elle permet aux utilisateurs de consulter des critiques, noter des œuvres, partager leurs avis et découvrir des recommandations personnalisées.

## 📌 Objectifs du projet

- Offrir un espace communautaire francophone dédié aux critiques de films et séries.
- Permettre la consultation rapide d’avis fiables.
- Proposer des recommandations basées sur les goûts des utilisateurs.
- Centraliser les critiques, notes et préférences dans une interface moderne et intuitive.

---

##  Utilisateurs cibles et permissions

| Type d'utilisateur     | Description                                        | Permissions principales |
|------------------------|----------------------------------------------------|--------------------------|
| **Visiteur non inscrit** | Navigue sans compte                              | Consulter les fiches, notes et critiques |
| **Utilisateur régulier** | Membre inscrit passionné de cinéma               | Noter, commenter, modifier/supprimer ses critiques, ajouter aux favoris, rechercher |
| **Administrateur**      | Staff responsable de la gestion de contenu        | Gérer les films/séries, modérer les critiques/commentaires, gérer les utilisateurs |

---

## ⚙ Fonctionnalités

### Fonctionnalités principales (MVP)

- ✅ Créer un compte / se connecter
- ✅ Noter un film ou une série (1 à 5 étoiles)
- ✅ Écrire / modifier / supprimer ses propres critiques
- ✅ Rechercher un contenu (titre, genre)
- ✅ Interface responsive (PC, tablette, mobile)
- ✅ Ajouter / modifier / supprimer des films et séries (admin)
- ✅ Supprimer des critiques/commentaires inappropriés (admin)

### Fonctionnalités secondaires

-  Ajouter aux favoris
-  Classement par genre, note ou popularité
-  Recommandations personnalisées
-  Historique utilisateur
-  Système de commentaires sur les critiques
 ### Fonctionnalités supplémentaires avec priorités

| Fonctionnalité                         | Priorité       |
| -------------------------------------- | -------------- |
| Gestion de profil                      | 🟢 Essentielle |
| Recherche et filtrage avancés          | 🟢 Essentielle |
| Envoi de propositions (films/séries)   | 🟢 Essentielle |
| Notation/commentaire sur les critiques | 🟡 Secondaire  |
| Tableau de bord administrateur         | 🟢 Essentielle |
| Statistiques détaillées                | 🟠 Bonus       |


---

## 🗂️ User Stories

| En tant que... | Je veux... | Afin de... |
|----------------|------------|-------------|
| Utilisateur régulier | Noter un film | Partager mon avis avec la communauté |
| Utilisateur régulier | Consulter des critiques | Me faire une idée avant de regarder |
| Visiteur non inscrit | Lire les critiques d'une série | Savoir si elle m'intéresse |
| Administrateur | Supprimer un commentaire inapproprié | Garantir une bonne modération |
| Administrateur | Ajouter une fiche film | Enrichir la base de données |

---

##  Stack Technique

- **Back-End** : Laravel (PHP)
- **Front-End** : React, HTML5, CSS3, JavaScript
- **Base de données** : MySQL
- **IDE** : VSCode, PhpStorm (optionnel)
- **Versioning** : Git, GitHub
- **Design** : Figma, Canva
- **API Tools** : Postman

---

##  Sécurité & Authentification

- Authentification via Laravel Breeze ou Sanctum (JWT)
- Middleware de rôles (user, admin)
- Validation des données côté front-end et back-end
- Protection CSRF intégrée via Laravel

---

##  Tests

- Tests unitaires Laravel (modèles, contrôleurs)
- Tests composants React (fonctionnels)
- Tests UX (par retours utilisateurs)
- Tests d’API avec Postman

---

##  Déploiement

| Étape | Description |
|-------|-------------|
| Local | Développement avec XAMPP (MySQL, Laravel, React) |
| Production | Hébergement sur 000webhost / Hostinger / OVH |
| Monitoring | Laravel Telescope, logs |
| Sauvegardes | Backups automatisés via hébergeur |

---

## 🗓️ Planification du projet

| Phase              | Tâches principales                                 | Durée estimée |
|--------------------|----------------------------------------------------|----------------|
| Analyse            | Collecte des besoins, user stories, priorisation   | 1 jour         |
| Conception         | BDD, wireframes, rôles, architecture               | 2 jours        |
| Développement Front-End | Structure, pages, composants React            | 5 jours        |
| Développement Back-End  | Auth, API REST, rôles Laravel                  | 5 jours        |
| Tests              | Tests unitaires, UX, corrections                   | 2 jours        |
| Déploiement        | Configuration, mise en ligne                       | 1 jour         |
| **Total estimé**   |                                                    | **16 jours**   |

## mokup 
https://www.canva.com/design/DAGn9-P7m4Y/KMeZ31n33qYt4u9HzEFvEA/view?utm_content=DAGn9-P7m4Y&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc6d2aa0cbe

