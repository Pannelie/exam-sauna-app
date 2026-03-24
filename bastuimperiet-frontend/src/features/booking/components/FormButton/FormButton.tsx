import * as S from "./formButton.style";
// Importera relevanta ikoner
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";

interface FormButtonProps {
    variant?: "text" | "outlined" | "contained";
    onClick: () => void;
    text: string;
    disabled?: boolean;
    isMobile?: boolean;
    type?: "next" | "back" | "send" | "reset"; // Ny prop för ikon-typ
    fullWidth?: boolean; // Ny prop för fullbredd (viktigt på mobil)
}

export const FormButton = ({ variant = "text", onClick, text, disabled, isMobile, type, fullWidth }: FormButtonProps) => {
    // Logik för att välja rätt ikon och placering
    const renderIcon = () => {
        const iconStyle = { fontSize: isMobile ? 14 : 16 }; // Något mindre ikon på mobil

        if (type === "back") {
            return <ArrowBackIosNewIcon sx={{ ...iconStyle, mr: 1 }} />; // mr: 1 ger marginal till höger
        }
        if (type === "next") {
            return <ArrowForwardIosIcon sx={{ ...iconStyle, ml: 1 }} />; // ml: 1 ger marginal till vänster
        }
        if (type === "send") {
            return <SendIcon sx={{ ...iconStyle, ml: 1 }} />;
        }
        if (type === "reset") {
            return <RefreshIcon sx={{ ...iconStyle, ml: 1 }} />;
        }
        return null;
    };

    return (
        <S.StyledButton
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            isMobile={isMobile}
            fullWidth={fullWidth} // Se till att din styled button tar emot denna
            sx={{
                py: isMobile ? 1.5 : 1, // Lite tjockare knappar på mobil (fingervänligt)
                fontSize: isMobile ? "0.9rem" : "1rem", // Något mindre text på mobil
                textTransform: "none", // Behåll gemener för bättre läsbarhet
                borderRadius: isMobile ? "12px" : "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Om det är en back-knapp, visa ikonen FÖRE texten */}
            {type === "back" && renderIcon()}

            {/* Texten syns alltid, men kan vara lite mindre på mobil */}
            {text}

            {/* För alla andra typer, visa ikonen EFTER texten */}
            {type !== "back" && renderIcon()}
        </S.StyledButton>
    );
};
