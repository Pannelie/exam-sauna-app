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
        let val = e.target.value.replace(/\D/g, ""); // Bara siffror

        let formatted = "";
        if (val.length > 0) formatted += val.slice(0, 4); // ÅÅÅÅ
        if (val.length > 4) formatted += "-" + val.slice(4, 6); // MM
        if (val.length > 6) formatted += "-" + val.slice(6, 8); // DD
        if (val.length > 8) formatted += " " + val.slice(8, 10); // HH
        if (val.length > 10) formatted += ":" + val.slice(10, 12); // mm

        onChange(formatted.slice(0, 16));
    };

    return (
        <StyledTextField
            label={label}
            placeholder="ÅÅÅÅ-MM-DD HH:mm"
            value={value || ""}
            onChange={handleInputChange}
            error={error}
            helperText={helperText}
            fullWidth
            inputProps={{ inputMode: "numeric", maxLength: 16 }}
            InputLabelProps={{ shrink: true }}
        />
    );
};
