enum BookingStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Declined = "declined",
    Cancelled = "cancelled",
}

export enum TransportType {
    OneWay = "oneWay",
    Return = "return",
}

export interface BookingBase {
    startDate: string | undefined;
    endDate: string | undefined;
    cleaning: boolean;
    firewood: number;
    scent: number;
    delivery: boolean;
    transportType?: TransportType;
}
export interface BookingFormData extends BookingBase {
    name: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
}

export interface ApiBookingData extends BookingBase {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;

    totalPrice: number;
    status: BookingStatus;
    integrations: {
        calendarUpdated: boolean | null;
        guestEmailSent: boolean | null;
        calendarError?: string | null;
        guestEmailError?: string | null;
    };
}

export interface BookingState extends BookingBase {
    // State
    totalPrice: number;
    isLoading: boolean;
    error: string | null;

    // Actions
    reset: () => void;
    setField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    calculateTotal: () => Promise<void>;
}

export interface BookingPriceData {
    startDate: string;
    endDate: string;
    cleaning: boolean;
    firewood: number;
    scent: number;
    delivery: boolean;
}

export interface ApiBookingData extends BookingBase {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;

    totalPrice: number;
    status: BookingStatus;
    integrations: {
        calendarUpdated: boolean | null;
        guestEmailSent: boolean | null;
        calendarError?: string | null;
        guestEmailError?: string | null;
    };
}
