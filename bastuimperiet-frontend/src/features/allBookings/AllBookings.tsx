import { useState, useEffect } from "react";
import { getAllBookings } from "./services/allBookingsService";
import type { ApiBookingData } from "../../types/bookingTypes";

export default function AllBookings() {
    const [bookings, setBookings] = useState<ApiBookingData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getAllBookings();
                setBookings(data);
            } catch (error) {
                console.error("Misslyckades att hämta bokningar:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []); // Körs bara vid mount

    if (loading) return <div>Laddar bokningar...</div>;

    return (
        <div>
            <h2>Alla Bokningar</h2>
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div key={booking.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                        <p>Bokning #{booking.id}</p>
                        {/* Rendera mer info här baserat på din ApiBookingData typ */}
                    </div>
                ))
            ) : (
                <p>Inga bokningar hittades.</p>
            )}
        </div>
    );
}
