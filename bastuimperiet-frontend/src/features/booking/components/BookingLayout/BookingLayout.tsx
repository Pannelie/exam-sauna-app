import "./bookingLayout.css";
import { BookingStepper } from "../BookingStepper/BookingStepper";

export const BookingLayout = () => {
    return (
        <section className="booking_layout">
            {/* Kalender */}
            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                    background: "white",
                    borderRadius: 16,
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                Kalender här
            </div>

            {/* Formulär */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <BookingStepper />
            </div>
        </section>
    );
};
