# Fitness Tracker Project

Projektnavn: StayStrong 

Dette er en README-fil for en Fitness Tracker webapplikation, udviklet med React, Redux, GraphQL og Tailwind CSS.

## Projektbeskrivelse

Fitness tracker-applikationen giver brugerne mulighed for at spore deres træning og oprette nye træningsøvelser. Applikationen er bygget med moderne teknologier som **Redux** til state management, **GraphQL** til datahåndtering, og **Tailwind CSS** til styling.

## Teknologier anvendt

- **React** til opbygning af brugergrænsefladen.
- **Redux** til centralisering af state management.
- **GraphQL** til fleksibel og effektiv datahåndtering.
- **Tailwind CSS** til hurtigt og responsivt design.
- **DaisyUI** til UI-komponenter baseret på Tailwind CSS.
- **Node.js** og **Express.js** til backend.
- **MongoDB** som database.

## Forudsætninger

Før du kan køre projektet, skal du have følgende installeret:

- **Node.js** (mindst version 14 eller nyere)

Du kan downloade og installere Node.js fra den officielle [Node.js hjemmeside](https://nodejs.org/).

## Installation og opsætning

Følg disse trin for at installere og starte applikationen:

1. **Klon projektet**:
   ```bash
   git clone https://github.com/MarcMadeIt/fitness-projekt.git
   cd fitness-tracker
   ```

2. **Installer afhængigheder**:
   - For frontend (client):
   ```bash
   cd client
   npm install
   ```
   - For backend (api):
   ```bash
   cd api
   npm install
   ```

3. **Start applikationen**:
   - For at køre frontend:
   ```bash
   cd client
   npm run dev
   ```
   - For at køre backend:
   ```bash
   cd api
   npm start
   ```


   Når både frontend og backend kører 🥉 vil applikationen være tilgængelig på:


   Frontend: http://localhost:5173
   Backend: http://localhost:3000

   

## Database tilknytning

4. **Opret MongoDB database (hvis du ikke allerede har)**

   Hvis du ønsker at køre applikationen med din egen database, kan du følge disse trin:

      - Opret en konto på [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (eller en anden databaseudbyder).
      - Opret en ny database og en ny bruger med de nødvendige rettigheder.
      - Kopier **MONGO_URI** fra din databaseforbindelse og indsæt den i din egen **.env**-fil.
      - Du kan nu køre applikationen med din egen database.
   

6. **Tilføj miljøvariabler**:
   - Tilføj .env fil til "api" og derefter tilføj dine nødvendige miljøvariabler 
   - Eksempel på .env
   ```bash
   MONGO_USERNAME=brugernavn-til-din-mongodb-database
   MONGO_PASSWORD=kodeord-til-din-mongodb-database
   MONGO_DB=fitness-tracker (eventuelt)
   JWT_SECRET=lav-en-unik-nøgle
   SECURE_KEY=lav-en-unik-nøgle
   ```



##Afslutning

Tak fordi du har taget dig tid til at gennemgå og teste applikationen. Dette Fitness Tracker-projekt, StayStrong, giver brugerne mulighed for at spore deres træning og oprette nye træningsøvelser. Det er bygget med moderne webteknologier og er designet til at være både effektiv og brugervenlig.

Jeg håber, du får en god oplevelse med at bruge applikationen og udforske dens funktionalitet. Hvis du har nogen spørgsmål, forslag til forbedringer eller ønsker at bidrage til projektet, er du meget velkommen til at åbne et issue eller sende et pull request.

##Fremtidige forbedringer

- Udvidelse af træningsmål og aktiviteter
-- Implementer mål for træningstid, distance og kalorier, samt flere aktiviteter som løb og cykling for at gøre applikationen mere alsidig.

- Brugerindstillinger og datakontrol
-- Giv brugerne mulighed for at redigere personlige oplysninger, ændre adgangskode og justere træningssessioner.

- Optimering af struktur og sikkerhed
-- Forbedr Redux-strukturen og implementer stærkere autentifikation med komplekse adgangskoder og mulighed for login via Google/Apple.
  

