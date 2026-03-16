import axios from "axios";
import type { adminUser } from "../types/adminTypes";

const baseUrl = import.meta.env.VITE_API_URL;

export const adminService = {
    login: async (credentials: adminUser) => {
        try {
            const response = await axios.post(`${baseUrl}/admin/login`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    },
};
