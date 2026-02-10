# Evaluation Final - API REST - Express

**Express.js | Prisma | PostgreSQL | JWT | Multer**

---

> **Contexte :** Vous devez concevoir une API REST pour une plateforme de gestion musicale. L'API permettra de gérer des **utilisateurs**, des **artistes**, des **albums** et des **playlists**.

---

## 1. Initialisation du projet

Créez un projet Node.js avec Express et installez les dépendances suivantes :

- **express** 
- **@prisma/client** + **prisma** — ORM
- **dotenv** — variables d'environnement
- **bcrypt** — hachage des mots de passe
- **jsonwebtoken** — gestion des tokens JWT
- **multer** — upload de fichiers

Initialisez Prisma avec `npx prisma init` et configurez la connexion PostgreSQL dans le fichier `.env`.

---

## 2. Modèles et Relations (schema.prisma)

Votre schéma Prisma doit comporter **4 modèles** liés entre eux. Définissez les relations directement dans le fichier **schema.prisma**.

### Modèle User

| Champ     | Type   | Contraintes              |
| --------- |--------| ------------------------ |
| id        | Int    | Clé primaire, auto-incrément |
| email     | String | Unique, obligatoire      |
| password  | String | Haché avec bcrypt        |
| name      | String | Obligatoire              |
| role      | String | Défaut : "USER"            |


### Modèle Artist

| Champ    | Type     | Contraintes                |
| -------- | -------- | -------------------------- |
| id       | Int      | Clé primaire, auto-incrément |
| name     | String   | Obligatoire                |
| bio      | String?  | Optionnel                  |
| photoUrl | String?  | URL de la photo (upload)   |

### Modèle Album

| Champ       | Type       | Contraintes                  |
| ----------- | ---------- | ---------------------------- |
| id          | Int        | Clé primaire, auto-incrément |
| title       | String     | Obligatoire                  |
| description | String?    | Optionnel                    |
| releaseDate | DateTime   | Date de sortie               |
| coverUrl    | String?    | URL de la couverture (upload)|
| artistId    | Int        | Clé étrangère → Artist       |

### Modèle Playlis

| Champ       | Type    | Contraintes              |
| ----------- | ------- | ------------------------ |
| id          | Int     | Clé primaire, auto-incrément |
| name        | String  | Obligatoire              |
| description | String? | Optionnel                |
| userId      | Int     | Clé étrangère → User     |

### Relations à implémenter

- Un **Artist** possède plusieurs **Album** (1:N)
- Un **Album** appartient à un **Artist**
- Un **User** possède plusieurs **Playlist** (1:N)
- Une **Playlist** contient plusieurs **Album** et un **Album** peut apparaître dans plusieurs **Playlist** (N:N)

**Exigences :**

- Les relations doivent être définies dans **schema.prisma**
- La suppression d'un artiste doit gérer les albums associés (`onDelete: Cascade` ou restriction)
- Utilisez `npx prisma migrate dev` pour générer et appliquer les migrations
- Un album ne peut pas être ajouté à une playlist s'il y est déjà

---

## 3. Authentification

### Routes

```
POST /auth/register  →  Inscription (email, password, name)
POST /auth/login     →  Connexion, retourne un JWT
```

**Exigences :**

- Le mot de passe doit être haché avec **bcrypt** avant stockage
- Le JWT doit contenir l'**id** et le **name** de l'utilisateur
- Le token expire après **24 heures**
- Créez un middleware **authMiddleware** qui vérifie le token dans le header `Authorization: Bearer <token>`
- Créez un middleware **adminMiddleware** qui vérifie que le role est ADMIN

---

## 4. CRUD Artistes

### Routes

```
GET    /artists          →  Liste des artistes (avec leurs albums)
GET    /artists/:id      →  Détail d'un artiste (avec ses albums)
POST   /artists          →  Créer un artiste (admin)
PUT    /artists/:id      →  Modifier un artiste (admin)
DELETE /artists/:id      →  Supprimer un artiste (admin)
```

**Exigences :**

- Les routes GET sont **publiques**
- Les routes POST, PUT, DELETE sont réservées aux **admins**
- Le GET par ID doit inclure les **albums de l'artiste** via Prisma `include`
- L'upload de la photo utilise **Multer** (format image uniquement, taille max 5 Mo)

---

## 5. CRUD Albums

### Routes

```
GET    /albums           →  Liste des albums (avec artiste)
GET    /albums/:id       →  Détail d'un album (avec artiste)
POST   /albums           →  Créer un album (authentifié)
PUT    /albums/:id       →  Modifier un album (authentifié)
DELETE /albums/:id       →  Supprimer un album (admin)
```

**Exigences :**

- Seuls les utilisateurs **authentifiés** peuvent créer et modifier un album
- Seuls les **admins** peuvent supprimer un album
- Le GET doit inclure les **données de l'artiste** associé
- Le **artistId** doit correspondre à un artiste existant (validation)
- L'upload de la couverture utilise **Multer** (vérification format image + taille max 5 Mo)

---

## 6. Gestion des Playlists

### Routes

```
POST   /playlists                     →  Créer une playlist (authentifié)
GET    /playlists/me                   →  Mes playlists (authentifié)
GET    /playlists/:id                  →  Détail d'une playlist (publique)
PUT    /playlists/:id                  →  Modifier une playlist (propriétaire)
DELETE /playlists/:id                  →  Supprimer une playlist (propriétaire)
POST   /playlists/:id/albums           →  Ajouter un album (propriétaire)
DELETE /playlists/:id/albums/:albumId  →  Retirer un album (propriétaire)
```

**Exigences :**

- Une playlist est créée avec un **name** et est automatiquement liée au **userId** du token JWT
- Seul le **propriétaire** de la playlist (ou un admin) peut la modifier, la supprimer, ou y ajouter/retirer des albums
- Vérifier qu'un album n'est **pas déjà présent** dans la playlist avant de l'ajouter
- Vérifier que l'**albumId** existe avant de l'ajouter
- **GET /playlists/:id** retourne la playlist avec ses albums et les artistes associés
- **GET /playlists/me** retourne uniquement les playlists de l'utilisateur connecté

---

## 7. Organisation du code

Le projet doit suivre l'architecture **Routes / Controllers / Services / Repositories** :

```
src/
├── prisma/
│   └── schema.prisma     Schéma des modèles et relations
├── config/              Configuration (Prisma Client, etc.)
├── routes/              Définition des routes
├── controllers/         Logique des requêtes HTTP
├── services/            Logique métier
├── repositories/        Communication avec la BDD via Prisma
├── middlewares/         JWT, Multer, admin, ownership...
├── uploads/             Images uploadées
└── app.js               Point d'entrée
```

**Règles d'architecture :**

- Les **routes** ne contiennent que les définitions de chemins et les middlewares appliqués
- Les **controllers** récupèrent les données de la requête et appellent les services
- Les **services** contiennent la logique métier (vérifications, règles)
- Les **repositories** sont les seuls à interagir avec Prisma Client
- Instanciez **PrismaClient** une seule fois dans config/ et exportez-le

---

## 8. Bonus 

- **Recherche** : Ajoutez un paramètre `?search=` sur GET /albums pour filtrer par titre (Prisma `contains`) : https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting
- **Gestion d'erreurs** : Créez un middleware global de gestion d'erreurs avec des messages cohérents

---

## 9. Rendu

- Fournir le **lien vers votre dépôt GitHub** contenant votre projet
- Ajoutez un fichier **README.md** expliquant comment installer et tester l'API
- Incluez un fichier **.env.example** avec les variables nécessaires
- Le dossier **node_modules** et le fichier **.env** ne doivent **pas** être dans le dépôt (.gitignore)
