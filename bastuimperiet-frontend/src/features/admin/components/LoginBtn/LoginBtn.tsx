import LoginIcon from "@mui/icons-material/Login";
import { CircularProgress } from "@mui/material";
import * as S from "./loginBtn.style";

interface LoginBtnProps {
    type: "submit";
    disabled?: boolean;
    loading?: boolean;
}
export const LoginBtn = ({ type, disabled, loading }: LoginBtnProps) => {
    return (
        <S.StyledLoginButton variant="contained" type={type} disabled={disabled || loading} startIcon={<LoginIcon />}>
            {loading ? <CircularProgress size={30} color="inherit" /> : "LOGGA IN"}
        </S.StyledLoginButton>
    );
};
