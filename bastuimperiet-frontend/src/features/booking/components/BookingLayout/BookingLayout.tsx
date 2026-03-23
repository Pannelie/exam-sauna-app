import "./bookingLayout.css";
import { useState } from "react";
import { BookingStepper } from "../BookingStepper/BookingStepper";
import type { BookingFormData, BookingBase } from "../../../../types/bookingTypes";
import { useCalendar } from "../../../calendar/hooks/useCalendar";
import { useBookingStore } from "../../stores/useBookingStore";
import { ClientCalendarCustomer } from "../ClientCalendar/ClientCalendar";

export const BookingLayout = () => {
    const { events, loading } = useCalendar();
    const { setField, reset: resetStore } = useBookingStore();

    const initialFormData: BookingFormData = {
        firewood: 0,
        scent: 0,
        cleaning: false,
        delivery: false,
        name: "",
        email: "",
        phone: "",
        address: "",
        postalCode: "",
        city: "",
        startDate: "",
        endDate: "",
    };

    const [formData, setFormData] = useState<BookingFormData>(initialFormData);

    const updateField = <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        const priceFields: (keyof BookingBase)[] = ["startDate", "endDate", "cleaning", "firewood", "scent", "delivery"];
        if (priceFields.includes(field as any)) {
            setField(field as any, value);
        }
    };

    const handleCalendarSelect = (start: string, end: string) => {
        updateField("startDate", start);
        updateField("endDate", end);
    };

    const resetForm = () => {
        setFormData(initialFormData);
        resetStore();
    };
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
                {!loading && (
                    <ClientCalendarCustomer
                        events={events}
                        onDateSelect={handleCalendarSelect}
                        startDate={formData.startDate}
                        endDate={formData.endDate}
                    />
                )}
            </div>

            {/* Formulär */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <BookingStepper formData={formData} updateField={updateField} onReset={resetForm} />
            </div>
        </section>
    );
};
