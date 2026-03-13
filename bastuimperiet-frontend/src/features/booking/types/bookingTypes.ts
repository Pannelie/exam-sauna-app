enum BookingStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Declined = "declined",
    Cancelled = "cancelled",
}

enum TransportType {
    OneWay = "oneWay",
    Return = "return",
}
export interface BookingFormData {
    startDate: string;
    endDate: string;

    firewood?: number;
    scent?: number;
    cleaning?: boolean;
    delivery?: boolean;
    transportType?: TransportType | null;

    name: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
}

export interface ApiBookingData {
    id: string;
    guestName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;

    startDate: string; // ISO-date
    endDate: string; // ISO-date

    cleaning?: boolean;
    firewood?: number;
    scent?: number;
    delivery?: boolean;
    transportType?: TransportType | null;

    totalPrice: number;
    status: BookingStatus;
    integrations: {
        calendarUpdated: boolean | null;
        guestEmailSent: boolean | null;
        calendarError?: string | null;
        guestEmailError?: string | null;
    };
}

export interface AdminBookingData {
    id: string;
    guestName: string;
    email: string;
    phone: string;
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;

    startDate: string; // ISO-date
    endDate: string; // ISO-date
    durationDays: number; // beräknad från startDate–endDate

    cleaning?: boolean;
    firewood?: number;
    scent?: number;
    delivery?: boolean;
    transportType?: TransportType | null;

    totalPrice: number;
    status: BookingStatus;

    // integrations kan vara intressant för admin att se men inte alltid nödvändigt
    calendarUpdated?: boolean | null;
    guestEmailSent?: boolean | null;

    // Extra fält för admin vy
    createdAt: string; // ISO-date när bokningen skapades
    updatedAt?: string; // ISO-date för senaste statusändring
}
