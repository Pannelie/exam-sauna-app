import React, { useState } from "react";
import { Box, TextField, Button, Paper, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { adminService } from "../../services/adminService"; // Justera sökvägen
import { useAuth } from "../../hooks/useAuth";

// --- Custom Styling för att matcha din bild ---

const GlassPaper = styled(Paper)({
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Halvtransparent vit
    backdropFilter: "blur(4px)",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
});

const StyledInput = styled(TextField)({
    marginBottom: "15px",
    "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        borderRadius: "8px",
        "& fieldset": { border: "2px solid #4a1a1a" }, // Mörk ram
        "&.Mui-focused fieldset": { borderColor: "#4a1a1a" },
    },
    "& input": {
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },
});

const YellowButton = styled(Button)({
    backgroundColor: "#f0c05a", // Din gula färg
    color: "white",
    fontWeight: "bold",
    fontSize: "1.4rem",
    padding: "12px 60px",
    borderRadius: "15px",
    marginTop: "20px",
    boxShadow: "0px 4px 0px #d0a040", // Ger lite 3D-känsla
    "&:hover": { backgroundColor: "#e0b04a" },
    "&:disabled": { backgroundColor: "#ccc" },
});

// --- Själva Komponenten ---

export const AdminLogin = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Här anropar vi din service!
            const response = await adminService.login({ email: credentials.email, password: credentials.password });

            if (response.token) {
                login(response.token, credentials.email);

                onLoginSuccess();
            }
            console.log("Inloggad!", response);
        } catch (err: any) {
            const serverErrorMessage = err.response?.data?.message || "Ett oväntat fel uppstod";
            setError(serverErrorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: "400px",
            }}
        >
            <GlassPaper>
                <AccountCircleIcon sx={{ fontSize: 100, color: "#4a1a1a", mb: 3 }} />

                <StyledInput
                    fullWidth
                    placeholder="E-POST"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    disabled={loading}
                />

                <StyledInput
                    fullWidth
                    type="password"
                    placeholder="LÖSENORD"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    disabled={loading}
                />

                {error && (
                    <Typography color="error" sx={{ mt: 1, width: "100%", textAlign: "center" }}>
                        {error}
                    </Typography>
                )}
            </GlassPaper>

            <YellowButton type="submit" disabled={loading}>
                {loading ? <CircularProgress size={30} color="inherit" /> : "LOGGA IN"}
            </YellowButton>
        </Box>
    );
};
