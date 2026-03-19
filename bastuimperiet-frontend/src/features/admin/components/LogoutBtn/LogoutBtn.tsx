import { Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const LogoutBtn = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleLogout = () => {
        // Rensa data
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");

        navigate("/admin/login", { replace: true });
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
