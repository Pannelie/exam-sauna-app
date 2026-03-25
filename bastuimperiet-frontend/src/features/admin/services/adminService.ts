import axios from "axios";
import type { adminUser, adminUpdate } from "../types/adminTypes";

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
    getProfile: async (token: string) => {
        const response = await axios.get(`${baseUrl}/admin/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
    getAll: async (token: string) => {
        try {
            const response = await axios.get(`${baseUrl}/admin`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching admins:", error);
            throw error;
        }
    },
    update: async (token: string, updates: adminUpdate) => {
        try {
            const response = await axios.put(`${baseUrl}/admin`, updates, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
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
