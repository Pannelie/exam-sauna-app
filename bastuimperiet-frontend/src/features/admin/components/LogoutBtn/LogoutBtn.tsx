import { Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const LogoutBtn = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleLogout = () => {
        // 1. Rensa data
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");

        // 2. Skicka användaren till login (med replace för att rensa historik)
        navigate("/admin/login", { replace: true });

        // 3. Valfritt: Tvinga en reload om du inte använder Context/State
        window.location.reload();
    };
    if (isMobile) {
        return (
            <IconButton onClick={handleLogout} color="inherit" title="Logga ut">
                <LogoutIcon />
            </IconButton>
        );
    }

    return (
        <Button
            variant="contained"
            sx={{
                bgcolor: "#E9B85B",
                color: "white",
                borderRadius: "15px",
                px: 4,
                "&:hover": { bgcolor: "#d4a74a" },
            }}
            onClick={handleLogout}
            startIcon={<LogoutIcon />} // Snyggt att ha ikonen även på knappen!
        >
            Logga ut
        </Button>
    );
};
