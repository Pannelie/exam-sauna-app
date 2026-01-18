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
    const type = getDayType(dateStr);
    return type === "helg" ? 800 : 600;
}

// Exempelbokningar
const bookings = [
    {
        id: "1",
        guestName: "Anna Svensson",
        email: "anna@example.com",
        phone: "0701234567",
        startDate: "2026-01-20",
        endDate: "2026-01-21",
        cleaning: true,
        firewood: 2, // 2 paket à 20 liter = 40 liter
    },
    {
        id: "2",
        guestName: "Erik Karlsson",
        email: "erik@example.com",
        phone: "0709876543",
        startDate: "2026-01-23",
        endDate: "2026-01-24",
        cleaning: false,
        firewood: 0,
    },
    {
        id: "3",
        guestName: "Lisa Johansson",
        email: "lisa@example.com",
        phone: "0705551234",
        startDate: "2026-04-18",
        endDate: "2026-04-18",
        cleaning: true,
        firewood: 1,
    },
    {
        id: "4",
        guestName: "Oskar Nilsson",
        email: "oskar@example.com",
        phone: "0701122334",
        startDate: "2026-01-25",
        endDate: "2026-01-26",
        cleaning: true,
        firewood: 3,
    },
];

// Beräkna totalpris
function calculateTotalPrice(startDateStr, endDateStr, cleaning, firewood) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    let totalPrice = 0;

    const dayCount = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Veckohyra/månadshyra
    if (dayCount >= 31) return 6000 + (cleaning ? 995 : 0) + firewood * 40;
    if (dayCount >= 7) return 2000 + (cleaning ? 995 : 0) + firewood * 40;

    // Summa per dag
    for (let i = 0; i < dayCount; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const dateStr = currentDate.toISOString().split("T")[0];
        totalPrice += calculateDayPrice(dateStr);
    }

    if (cleaning) totalPrice += 995;
    if (firewood) totalPrice += firewood * 40;

    return totalPrice;
}

async function seedBookings() {
    for (const booking of bookings) {
        const totalPrice = calculateTotalPrice(booking.startDate, booking.endDate, booking.cleaning, booking.firewood);

        const item = {
            PK: `BOOKING#${booking.id}`,
            SK: "BOOKING",
            guestName: booking.guestName,
            email: booking.email,
            phone: booking.phone,
            startDate: booking.startDate,
            endDate: booking.endDate,
            cleaning: booking.cleaning,
            firewood: booking.firewood,
            status: "pending",
            totalPrice,
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

            console.log(`Bokning skapad: ${booking.guestName} (${booking.startDate}) – ${totalPrice} kr`);
        } catch (err) {
            if (err.code === "ConditionalCheckFailedException") {
                console.log(`Bokning finns redan: ${booking.guestName}`);
            } else {
                console.error("Fel vid skapande av bokning:", err);
            }
        }
    }
}

seedBookings();
