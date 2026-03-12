import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = TextFieldProps & {
    flex?: number;
};

const CustomTextField = styled(TextField, {
    shouldForwardProp: (prop) => prop !== "flex",
})<Props>(({ flex }) => ({
    flex: flex ?? 1,

    "& .MuiOutlinedInput-root": {
        backgroundColor: "#fff",
        height: 44,
    },
}));

export const StyledTextField = (props: Props) => {
    return <CustomTextField fullWidth size="small" {...props} />;
};
