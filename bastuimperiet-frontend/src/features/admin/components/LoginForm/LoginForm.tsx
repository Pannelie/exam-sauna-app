import React, { useState } from "react";
import { adminService } from "../../services/adminService"; // Justera sökvägen
import { useAuth } from "../../hooks/useAuth";
import * as S from "./loginForm.style";
import { LoginBtn } from "../LoginBtn/LoginBtn";

export const AdminLogin = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Här anropar vi din service!
            const response = await adminService.login({ email: credentials.email, password: credentials.password });

            if (response.token) {
                login(response.token, credentials.email);

                onLoginSuccess();
            }
            console.log("Inloggad!", response);
        } catch (err: any) {
            const serverErrorMessage = err.response?.data?.message || "Ett oväntat fel uppstod";
            setError(serverErrorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.StyledFormContainer onSubmit={handleLogin}>
            <S.GlassPaper>
                <S.LoginIcon />

                <S.StyledInput
                    fullWidth
                    placeholder="E-POST"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    disabled={loading}
                />

                <S.StyledInput
                    fullWidth
                    type="password"
                    placeholder="LÖSENORD"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    disabled={loading}
                />

                {error && <S.ErrorText>{error}</S.ErrorText>}
            </S.GlassPaper>
            <LoginBtn disabled={loading} type="submit" loading={loading} />
        </S.StyledFormContainer>
    );
};
