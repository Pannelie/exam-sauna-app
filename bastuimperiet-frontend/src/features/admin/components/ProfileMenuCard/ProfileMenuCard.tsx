import { Box, Button, IconButton, Paper, Typography, styled } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const DropdownCard = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "100%",
    right: 0,
    width: "250px",
    backgroundColor: "#632B2B", // Färgen från din bild
    color: "white",
    padding: theme.spacing(3),
    display: "none",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "20px",
    zIndex: 10,
}));

const UserWrapper = styled(Box)({
    position: "relative",
    display: "inline-block",
    "&:hover .dropdown-card": {
        display: "flex",
    },
});

export function ProfileMenuCard({ user }: { user: { name: string; email: string } }) {
    const navigate = useNavigate();

    return (
        <UserWrapper>
            {/* Klick på ikonen tar en till admin-listan */}
            <IconButton onClick={() => navigate("/admin/profiles")} sx={{ color: "white" }}>
                <AccountCircleIcon fontSize="large" />
            </IconButton>

            {/* Hover-kortet */}
            <DropdownCard className="dropdown-card" elevation={4}>
                <AccountCircleIcon sx={{ fontSize: 60, mb: 1 }} />
                <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                    {user.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                    {user.email}
                </Typography>

                <Button
                    variant="contained"
                    sx={{ bgcolor: "#E9B85B", color: "white", borderRadius: "15px", px: 4, "&:hover": { bgcolor: "#d4a74a" } }}
                    onClick={() => console.log("Logga ut")}
                >
                    LOGGA UT
                </Button>
            </DropdownCard>
        </UserWrapper>
    );
}
