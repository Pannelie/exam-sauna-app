import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StyledTextField } from "../StyledTextField/StyledTextField";

interface MyDatePickerProps {
    value: string | null;
    onChange: (value: string) => void;
    label: string;
    error?: boolean;
    helperText?: string;
}

export const MyDatePicker: React.FC<MyDatePickerProps> = ({ value, onChange, label, error, helperText }) => {
    const dateValue = value ? new Date(value) : null;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={dateValue}
                label={label}
                enableAccessibleFieldDOMStructure={false}
                onChange={(newDate) => {
                    onChange(newDate ? newDate.toISOString().split("T")[0] : "");
                }}
                slots={{
                    textField: (params) => <StyledTextField {...params} error={error} helperText={helperText} />,
                }}
            />
        </LocalizationProvider>
    );
};
