import type { ChangeEvent } from "react";
import { StyledTextField } from "../StyledTextField/StyledTextField";

interface MyDateInputProps {
    value: string | null;
    onChange: (value: string) => void;
    label: string;
    error?: boolean;
    helperText?: string;
}

export const MyDateInput: React.FC<MyDateInputProps> = ({ value, onChange, label, error, helperText }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, ""); // Behåll bara siffror

        // Formatera strängen dynamiskt
        // ÅÅÅÅ-MM-DD
        if (val.length > 4 && val.length <= 6) {
            val = `${val.slice(0, 4)}-${val.slice(4)}`;
        } else if (val.length > 6) {
            val = `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`;
        }

        // Begränsa till 10 tecken (ÅÅÅÅ-MM-DD)
        const finalVal = val.slice(0, 10);

        onChange(finalVal);
    };

    return (
        <StyledTextField
            label={label}
            placeholder="ÅÅÅÅ-MM-DD"
            value={value || ""}
            onChange={handleInputChange}
            // Här mappar vi dina inskickade props till TextField
            error={error}
            helperText={helperText}
            fullWidth
            inputProps={{
                inputMode: "numeric",
                maxLength: 10,
            }}
            // Ser till att etiketten inte krockar med placeholder
            InputLabelProps={{ shrink: true }}
        />
    );
};
