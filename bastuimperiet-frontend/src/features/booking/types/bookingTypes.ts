export interface BookingFormData {
    startDate?: string;
    endDate?: string;

    wood: number;
    scent: number;
    cleaning: boolean;
    delivery: boolean;
    deliveryType?: "oneWay" | "return";

    name: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
}

export interface ApiBookingData {
    id: number;
    startDate: string;
    endDate: string;
}
