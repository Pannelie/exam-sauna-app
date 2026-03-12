export interface BookingFormData {
    startDate?: string;
    endDate?: string;

    ved: number;
    doft: number;
    cleaning: boolean;
    delivery: boolean;
    deliveryType?: "oneWay" | "return";

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
    city: string;
}
