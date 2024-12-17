Teknisk Dokumentation

1. Forudsætninger
   Før du begynder, skal du sikre dig, at følgende værktøjer er installeret:

Node.js (version 14.x eller højere)
npm eller Yarn
Git (valgfrit, men anbefales) 2. Opsætning af Projektet
2.1 Klon Repositoriet
Klon projektet fra GitHub:

bash
Copy code
git clone https://github.com/din-bruger/fitness-tracker.git
cd fitness-tracker
2.2 Installer Afhængigheder
Installér de nødvendige afhængigheder:

Med npm:

bash
Copy code
npm install
Med Yarn:

bash
Copy code
yarn install 3. Miljøvariabler
Opret en .env-fil i projektets rodmappe og tilføj følgende miljøvariabler:

bash
Copy code
MONGODB_URI=mongodb://localhost:27017/fitness-tracker
JWT_SECRET=dinhemmeligejwtkode
GRAPHQL_URI=http://localhost:4000/graphql 4. Kør Projektet
4.1 Udviklingsmiljø
For at køre både frontend og backend i udviklingsmiljøet:

Start frontend (React) i udviklingsmode:
bash
Copy code
npm run dev
Start backend (Node.js/Express) i udviklingsmode:
bash
Copy code
npm start
Applikationen vil nu være tilgængelig på http://localhost:3000.

4.2 Produktionsmiljø
For at køre applikationen i produktionsmode:

Byg frontend:
bash
Copy code
npm run build
Start produktion serveren:
bash
Copy code
npm start 5. Test Projektet
5.1 Enhedstests
Kør testene med følgende kommando:

Med npm:

bash
Copy code
npm test
Med Yarn:

bash
Copy code
yarn test 6. Deployment
For deployment kan du bruge Vercel eller Heroku.

Vercel: Brug Vercels GitHub-integration til nemt at deploye din app.
Heroku: Følg Heroku’s dokumentation for at deploye Node.js-applikationer.
