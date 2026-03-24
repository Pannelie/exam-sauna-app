import { SwipeableDrawer, Box, styled } from "@mui/material";
import type { ReactNode } from "react";

// Den lilla grå baren (handtaget)
const Puller = styled(Box)(() => ({
    width: 40,
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    position: "absolute",
    top: 12,
    left: "calc(50% - 20px)",
}));

interface MobileBottomSheetProps {
    open: boolean;
    onClose: () => void;
    onOpen?: () => void;
    children: ReactNode;
    maxHeight?: string;
}

export const MobileBottomSheet = ({ open, onClose, onOpen = () => {}, children, maxHeight = "90vh" }: MobileBottomSheetProps) => {
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            swipeAreaWidth={0}
            disableBackdropTransition={true}
            PaperProps={{
                sx: {
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    maxHeight: maxHeight,
                    overflow: "visible",
                    backgroundColor: "#fff",
                },
            }}
        >
            {/* Drag-yta med Puller */}
            <Box
                sx={{
                    width: "100%",
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    cursor: "grab",
                    marginBottom: 2,
                }}
            >
                <Puller />
            </Box>

            {/* Innehållet som skickas in */}
            <Box sx={{ p: 2, pt: 0, pb: 4 }}>{children}</Box>
        </SwipeableDrawer>
    );
};
