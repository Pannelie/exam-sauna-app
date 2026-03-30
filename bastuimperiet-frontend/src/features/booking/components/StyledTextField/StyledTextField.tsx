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

    "& .MuiFormHelperText-root": {
        marginTop: 4,
        marginLeft: 2,
        marginRight: 2,
        fontSize: "0.72rem",
        lineHeight: 1.25,
    },
}));

export const StyledTextField = (props: Props) => {
    return <CustomTextField fullWidth size="small" {...props} />;
};
