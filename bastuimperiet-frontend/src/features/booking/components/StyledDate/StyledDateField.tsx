import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = TextFieldProps & { flex?: number };
export const StyledDateField = styled(TextField, {
    shouldForwardProp: (prop) => prop !== "flex",
})<Props>(({ flex }) => ({
    flex: flex ?? 1,
    margin: 0, // tar bort MUI:s standardmarginal
    minHeight: 0, // tvingar ner höjden
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#fff",
        borderRadius: 4,
        minHeight: 40, // bestämd höjd på fältet
        padding: "0 8px", // padding horisontellt
        display: "flex",
        alignItems: "center",
    },
    "& input[type='date']": {
        padding: "8px 0", // padding inuti själva datum-inputen
        height: "100%", // fyller ut hela fältet
        boxSizing: "border-box",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccc", // border runt hela fältet
    },
}));
