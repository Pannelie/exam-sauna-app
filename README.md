# Bastuimperiet – Exam Sauna App

Bastuimperiet är ett komplett bokningssystem utvecklat som examensarbete för ett företag med mobil bastuuthyrning. Systemet omfattar både kundens bokningsflöde och ett administrationsgränssnitt för att hantera bokningar.

Projektet innehåller:

- Frontend: React + TypeScript (Vite) + Zustand
- Backend: Serverless Node.js med AWS Lambda och API Gateway
- Databas: Amazon DynamoDB
- Integrationer: Google Calendar API och AWS SES för e-postutskick
- Funktionalitet: Bokningsflöde, prisberäkning, validering, bokningsstatus och administrationsgränssnitt
- 
## Snabb överblick

En kund kan skapa en bokningsförfrågan.
En admin kan logga in, se bokningar och ändra status.
Systemet hanterar även prisberäkning, kalenderhändelser och mejlutskick.

## Länkar

Publik sida:
http://bastuimperiet-bucket.s3-website.eu-north-1.amazonaws.com/

Publik Admin:
http://bastuimperiet-bucket.s3-website.eu-north-1.amazonaws.com/admin/login

Testinloggning admin:

- E-post: no-reply-bastuimperiet@outlook.com
- Lösenord: admin123

## Kör lokalt

Starta backend och frontend i varsin terminal.

### Backend

```bash
cd bastuimperiet-backend
npm install
cp .env.example .env
npm run offline
```

### Frontend

```bash
cd bastuimperiet-frontend
npm install
```

Skapa en fil som heter `.env` i frontend-mappen med:

```env
VITE_API_URL=http://localhost:3000
```

Starta frontend:

```bash
npm run dev
```

## Viktigt om mejl vid test

Tyvärr kan användaren inte få ta del av de mejl som admin får.

Om användaren anger sin privata mejl när den testar bokning kommer den att få mejlet i sin egen inkorg (ibland i skräppost).

Innan test behöver användaren skicka sin mejladress till mig först.

## Förslag på testflöde för opponering

1. Starta backend och frontend.
2. Skapa en bokningsförfrågan på startsidan.
3. Logga in i adminläget.
4. Kontrollera att bokningen syns i adminvyn.
5. Ändra status på bokningen och kontrollera att uppdatering sker.
6. Verifiera att kalender och mejlflöde triggas.
