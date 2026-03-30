import axios from "axios";
import type { AdminUser, AdminUpdate } from "../types/adminTypes";

const baseUrl = import.meta.env.VITE_API_URL;
console.log("[adminService] baseUrl:", baseUrl);

export const adminService = {
    login: async (credentials: AdminUser) => {
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
    getProfile: async (token: string) => {
        const response = await axios.get(`${baseUrl}/admin/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Profile fetched:", response.data);
        return response.data;
    },
    getAll: async (token: string) => {
        console.log("[adminService] getAll called. Token:", token);
        try {
            const response = await axios.get(`${baseUrl}/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Admins fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching admins:", error);
            throw error;
        }
    },
    update: async (token: string, updates: AdminUpdate) => {
        try {
            const response = await axios.patch(`${baseUrl}/admin`, updates, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Admin updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating admin:", error);
            throw error;
        }
    },
    changePassword: async (token: string, oldPassword: string, newPassword: string) => {
        try {
            const response = await axios.patch(
                `${baseUrl}/admin/password`,
                { oldPassword, newPassword },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error("Error changing password:", error);
            throw error;
        }
    },
};
