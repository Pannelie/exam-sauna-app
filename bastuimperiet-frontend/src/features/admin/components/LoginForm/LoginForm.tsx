import React, { useState } from "react";
import { Box, TextField, Button, Container, Paper, CircularProgress, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { adminService } from "../../services/adminService"; // Justera sökvägen
import { useNavigate } from "react-router-dom";

// --- Custom Styling för att matcha din bild ---

const GlassPaper = styled(Paper)({
    backgroundColor: "rgba(255, 255, 255, 0.25)", // Halvtransparent vit
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

export const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Här anropar vi din service!
            const response = await adminService.login({ username, password });

            console.log("Inloggad!", response);
            // Spara token om det behövs: localStorage.setItem("token", response.token);
            navigate("/dashboard");
        } catch (err) {
            setError("Kunde inte logga in. Kontrollera uppgifterna.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#7a2a2a", // Eller backgroundImage: 'url(...)'
            }}
        >
            <Container maxWidth="xs">
                <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <GlassPaper>
                        <AccountCircleIcon sx={{ fontSize: 100, color: "#4a1a1a", mb: 3 }} />

                        <StyledInput
                            fullWidth
                            placeholder="ANVÄNDARNAMN"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                        />

                        <StyledInput
                            fullWidth
                            type="password"
                            placeholder="LÖSENORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />

                        {error && (
                            <Alert severity="error" sx={{ mt: 1, width: "100%" }}>
                                {error}
                            </Alert>
                        )}
                    </GlassPaper>

                    <YellowButton type="submit" disabled={loading}>
                        {loading ? <CircularProgress size={30} color="inherit" /> : "LOGGA IN"}
                    </YellowButton>
                </Box>
            </Container>
        </Box>
    );
};
