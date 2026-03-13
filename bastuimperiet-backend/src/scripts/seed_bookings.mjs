// seedBookings.js
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "eu-north-1",
});

const TABLE_NAME = process.env.TABLE_NAME;

if (!TABLE_NAME) {
    console.error("TABLE_NAME saknas i .env");
    process.exit(1);
}

// Dagtyp: vardag/helg
function getDayType(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay(); // 0 = sön, 6 = lör
    if (day === 5 || day === 6) return "helg"; // fre-lör
    return "vardag"; // sön–tors
}

// Storhelg
const specialDays = ["2026-04-18", "2026-06-06"];
function isSpecialDay(dateStr) {
    return specialDays.includes(dateStr);
}

// Pris per dag
function calculateDayPrice(dateStr) {
    if (isSpecialDay(dateStr)) return 950;
    return getDayType(dateStr) === "helg" ? 800 : 600;
}

// Totalpris för bokning
function calculateTotalPrice(startDateStr, endDateStr, cleaning, firewood) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    const dayCount = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Veckohyra/månadshyra
    if (dayCount >= 31) return 6000 + (cleaning ? 995 : 0) + firewood * 40;
    if (dayCount >= 7) return 2000 + (cleaning ? 995 : 0) + firewood * 40;

    let total = 0;
    for (let i = 0; i < dayCount; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const dateStr = currentDate.toISOString().split("T")[0];
        total += calculateDayPrice(dateStr);
    }

    if (cleaning) total += 995;
    if (firewood) total += firewood * 40;

    return total;
}

// Exempelbokningar
const bookings = [
    {
        id: "1",
        name: "Anna Svensson",
        email: "anna@example.com",
        phone: "0701234567",
        startDate: "2026-01-20",
        endDate: "2026-01-21",
        cleaning: true,
        firewood: 2,
    },
    {
        id: "2",
        name: "Erik Karlsson",
        email: "erik@example.com",
        phone: "0709876543",
        startDate: "2026-01-23",
        endDate: "2026-01-24",
        cleaning: false,
        firewood: 0,
    },
    {
        id: "3",
        name: "Lisa Johansson",
        email: "lisa@example.com",
        phone: "0705551234",
        startDate: "2026-04-18",
        endDate: "2026-04-18",
        cleaning: true,
        firewood: 1,
    },
];

async function seedBookings() {
    for (const booking of bookings) {
        const totalPrice = calculateTotalPrice(booking.startDate, booking.endDate, booking.cleaning, booking.firewood);

        const item = {
            PK: `BOOKING#${booking.id}`,
            SK: "BOOKING",
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            startDate: booking.startDate,
            endDate: booking.endDate,
            cleaning: booking.cleaning,
            firewood: booking.firewood,
            status: "pending",
            totalPrice,

            // GSI1 för query på status
            GSI1PK: `STATUS#pending`,
            GSI1SK: booking.startDate, // sorterar bokningar på startdatum

            // GSI2 för att hämta alla bokningar sorterat på startdatum
            GSI2PK: "BOOKING",
            GSI2SK: booking.startDate,
        };

        try {
            await dynamo
                .put({
                    TableName: TABLE_NAME,
                    Item: item,
                    ConditionExpression: "attribute_not_exists(PK)",
                })
                .promise();

            console.log(`Bokning skapad: ${booking.name} (${booking.startDate}) – ${totalPrice} kr`);
        } catch (err) {
            if (err.code === "ConditionalCheckFailedException") {
                console.log(`Bokning finns redan: ${booking.name}`);
            } else {
                console.error("Fel vid skapande av bokning:", err);
            }
        }
    }
}

seedBookings();
