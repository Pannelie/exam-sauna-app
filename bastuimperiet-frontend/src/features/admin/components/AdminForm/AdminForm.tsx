import { Button, TextField, Box, Typography, CircularProgress } from "@mui/material";
import { useAdminsStore } from "../../stores/useAdminsStore";
import { adminService } from "../../services/adminService";
import { BasicButton } from "../../../../components/BasicButton/BasicButton";
import { useRef, useState, useEffect } from "react";

export const AdminForm = () => {
    const updateProfile = useAdminsStore((state) => state.updateProfile);
    const myProfile = useAdminsStore((state) => state.myProfile);
    const formRef = useRef<HTMLFormElement>(null);

    // State
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");

    // Initiera fält när myProfile laddas eller när man går tillbaka till användaruppgifter
    useEffect(() => {
        if (!showPasswordForm && myProfile) {
            setUsername(myProfile.username || "");
            setPhone(myProfile.phone || "");
        }
    }, [showPasswordForm, myProfile]);

    // Återställ till huvudvyn när komponenten stängs (om den sitter i en Modal/Drawer)
    useEffect(() => {
        return () => {
            setShowPasswordForm(false);
            resetPasswordState();
        };
    }, []);

    const resetPasswordState = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError(null);
        setPasswordSuccess(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileError(null);
        setProfileSuccess(null);

        // Validering
        if (!username || username.length < 3) {
            setProfileError("Användarnamn måste vara minst 3 tecken.");
            return;
        }
        if (!/^[0-9+\- ]{7,}$/.test(phone)) {
            setProfileError("Telefonnummer måste vara minst 7 siffror och bara innehålla siffror, +, - eller mellanslag.");
            return;
        }

        try {
            await updateProfile({ username, phone });
            setProfileSuccess("Uppgifter uppdaterade!");
        } catch (err: any) {
            setProfileError(err?.message || "Kunde inte uppdatera uppgifter");
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(null);

        if (newPassword.length < 6) {
            setPasswordError("Lösenordet måste vara minst 6 tecken.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("Nya lösenorden matchar inte");
            return;
        }

        setLoadingPassword(true);
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) throw new Error("Ingen token hittad");
            await adminService.changePassword(token, oldPassword, newPassword);
            setPasswordSuccess("Lösenordet är uppdaterat!");
            setTimeout(() => {
                setShowPasswordForm(false);
                resetPasswordState();
            }, 2000);
        } catch (err: any) {
            setPasswordError(err?.response?.data?.message || err.message || "Fel vid lösenordsbyte");
        } finally {
            setLoadingPassword(false);
        }
    };

    return (
        <>
            {!showPasswordForm ? (
                <Box
                    key="profile-view"
                    component="form"
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Mina Användaruppgifter
                    </Typography>

                    <TextField
                        label="E-post"
                        defaultValue={myProfile?.email}
                        variant="outlined"
                        fullWidth
                        disabled
                        helperText="E-post kan inte ändras"
                    />
                    <TextField
                        label="Användarnamn"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Telefon"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />

                    {profileError && (
                        <Typography color="error" variant="body2">
                            {profileError}
                        </Typography>
                    )}
                    {profileSuccess && (
                        <Typography color="success.main" variant="body2">
                            {profileSuccess}
                        </Typography>
                    )}

                    <Button color="primary" variant="contained" type="submit" sx={{ py: 1.5, fontWeight: "bold" }}>
                        Spara uppgifter
                    </Button>

                    <BasicButton color="secondary" variant="text" onClick={() => setShowPasswordForm(true)}>
                        Byt lösenord
                    </BasicButton>
                </Box>
            ) : (
                <Box
                    key="password-view"
                    component="form"
                    onSubmit={handlePasswordSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Byt lösenord
                    </Typography>

                    <TextField
                        label="Nuvarande lösenord"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Nytt lösenord"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Bekräfta nytt lösenord"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!passwordError && newPassword !== confirmPassword}
                    />

                    {passwordError && (
                        <Typography color="error" variant="body2">
                            {passwordError}
                        </Typography>
                    )}
                    {passwordSuccess && (
                        <Typography color="success.main" variant="body2">
                            {passwordSuccess}
                        </Typography>
                    )}

                    <BasicButton color="primary" variant="contained" type="submit" disabled={loadingPassword || !!passwordSuccess}>
                        {loadingPassword ? <CircularProgress size={24} /> : "Spara nytt lösenord"}
                    </BasicButton>
                    <BasicButton
                        color="secondary"
                        variant="text"
                        onClick={() => {
                            setShowPasswordForm(false);
                            resetPasswordState();
                        }}
                    >
                        Avbryt
                    </BasicButton>
                </Box>
            )}
        </>
    );
};
