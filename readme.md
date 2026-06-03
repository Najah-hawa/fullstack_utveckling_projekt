# Backend API 
Detta är en fristående REST-webbtjänst byggd med Hapi.js och MongoDB för ett internt lager- och produkthanteringssystem.

## Teknisk Stack
Node.js, Hapi.js, MongoDB Atlas via Mongoose, Joi, Bcrypt och JSON Web Tokens (JWT).

## Kom igång och starta projektet:
Öppna din terminal eller kommandotolk.

### Gå till backend-mappen genom att skriva:
cd backend

### Installera alla nödvändiga paket genom att skriva:
npm install

### Skapa en ny fil i backend-mappen som du döper till exakt: .env

Öppna .env-filen i VS Code och klistra in följande rader:
PORT=3000
MONGO_URI=mongodb+srv://<ANVÄNDARE>:<LÖSENORD>@cluster.mongodb.net/din_databas 
JWT_SECRET=valfritt_hemligt_lösenord_för_jwt

### Starta igång servern genom att skriva:
npm start

# Inloggningsuppgifter för testning 
Eftersom systemet kräver inloggning för att kunna göra ändringar, använd detta konto för att testa applikationen:

**E-post: admin@store.com **

**Lösenord: secretpassword123 **

## Tillgängliga API-länkar (Endpoints)
### Logga in: POST /auth/login

### Registrera: POST /auth/register

### Hämta kategorier: GET /categories

### Hantera produkter: GET, POST, PUT, DELETE på /products

###  Justera lagersaldo: PATCH /products/:id/stock