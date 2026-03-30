export interface AdminUser {
    email: string;
    password: string;
}

export interface AdminUpdate {
    username?: string;
    phone?: string;
    email?: string;
}

export interface AdminProfile {
    email: string;
    username?: string;
    phone?: string;
}

export interface UseAdminProfileReturn {
    profile: AdminProfile | null;
    loading: boolean;
    error: Error | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (updates: AdminUpdate) => Promise<AdminProfile>;
}
