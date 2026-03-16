import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const LogoutBtn = ({ onLogout }: { onLogout: () => void }) => {
    return (
        <IconButton onClick={onLogout}>
            <LogoutIcon />
        </IconButton>
    );
};
