# Eval finale express/node/prisma

## Configuration de l'environnement

### Initialisation

```bash 
npm init 
# modifié type = module et entry point app.js
```

### Installation prisma 7

Depuis la doc officielle https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres

```bash 
# Initialisation Typescript
npm install typescript tsx @types/node --save-dev
npx tsc --init

#Installation de dépendances
npm install prisma @types/node @types/pg --save-dev 
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

```json
# Mise à jour tsconfig.json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0"
  }
}
```

```bash
# Initiaisation project prisma
npx prisma init --db --output ../generated/prisma

# Après avoir créé un model Test très simple
npx prisma db push
npx prisma generate
```



### Contenaire base de données Docker

```yml
services:
  db:
    image: postgres:16
    container_name: eval-final
    restart: always
    environment:
      POSTGRES_USER: eval-final
      POSTGRES_PASSWORD: password
      POSTGRES_DB: eval-final
    ports:
      - "5445:5432"

volumes:
  postgres_data:
```

### Config express

```bash
npm install express
npm install bcrypt jsonwebtoken multer
```

Fichier de démarrage :

```js
import express  from 'express';

const PORT = 3010

const app = express();

app.use(express.json())

app.get('/', ((req, res) => {
    res.status(200).json({message: "Hello"})
}) )

app.listen(PORT, () => {
    console.log(`Server start : http://localhost:${PORT}`)
})

```