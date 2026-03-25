import { create } from "zustand";
import { adminService } from "../services/adminService";
import type { AdminProfile, AdminUpdate } from "../types/adminTypes";

interface AdminsStore {
    admins: AdminProfile[];
    myProfile: AdminProfile | null;
    loading: boolean;
    error: Error | null;

    fetchAdmins: () => Promise<void>;
    fetchMyProfile: () => Promise<void>;
    updateProfile: (updates: AdminUpdate) => Promise<AdminProfile>;
}

export const useAdminsStore = create<AdminsStore>((set) => ({
    admins: [],
    myProfile: null,
    loading: false,
    error: null,

    fetchAdmins: async () => {
        set({ loading: true });
        try {
            const token = localStorage.getItem("adminToken");
            console.log("[useAdminsStore] fetchAdmins called. Token:", token);
            if (!token) throw new Error("Ingen token hittad");
            const data = await adminService.getAll(token);
            set({ admins: data, error: null });
        } catch (err: any) {
            set({ error: err });
        } finally {
            set({ loading: false });
        }
    },

    fetchMyProfile: async () => {
        set({ loading: true });
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) throw new Error("Ingen token hittad");
            const data = await adminService.getProfile(token);
            set({ myProfile: data, error: null });
        } catch (err: any) {
            set({ error: err });
        } finally {
            set({ loading: false });
        }
    },

    updateProfile: async (updates: AdminUpdate): Promise<AdminProfile> => {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("Ingen token hittad");

        const data = await adminService.update(token, updates);
        set({ myProfile: data });

        // Uppdatera listan också så att highlight fortfarande fungerar
        set((state) => ({
            admins: state.admins.map((a) => (a.email === data.email ? data : a)),
        }));

        return data;
    },
}));
