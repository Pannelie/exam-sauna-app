import { Button, TextField, Box, Typography } from "@mui/material";

export const AdminForm = () => {
    return (
        <>
            {/* Paper ger en snygg vit bakgrund med skugga */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Användaruppgifter
            </Typography>

            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
