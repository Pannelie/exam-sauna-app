import { Button, TextField, Box, Typography } from "@mui/material";
import { useAdminsStore } from "../../stores/useAdminsStore";
import { useRef } from "react";

export const AdminForm = () => {
    const updateProfile = useAdminsStore((state) => state.updateProfile);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const updates = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
        };

        await updateProfile(updates);

        // Detta tömmer ALLA fält i formuläret automatiskt
        formRef.current.reset();
    };

    return (
        <>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Användaruppgifter
            </Typography>

            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }} ref={formRef} onSubmit={handleSubmit}>
                <TextField label="Användarnamn" variant="outlined" name="username" fullWidth />
                <TextField label="E-post" variant="outlined" type="email" name="email" fullWidth />
                <TextField label="Telefon" variant="outlined" name="phone" fullWidth />

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    sx={{ mt: 1, py: 1.5, textTransform: "none", fontWeight: "bold" }}
                >
                    Spara uppgifter
                </Button>
            </Box>
        </>
    );
};
