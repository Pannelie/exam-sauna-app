import { IconButton, styled } from "@mui/material";
export const ActionButton = styled(IconButton)<{ actionType: "confirm" | "decline" }>(({ actionType }) => ({
    color: actionType === "confirm" ? "#4CAF50" : "#D32F2F",
    backgroundColor: actionType === "confirm" ? "rgba(76, 175, 80, 0.1)" : "rgba(211, 47, 47, 0.1)",
    "&:hover": {
        backgroundColor: actionType === "confirm" ? "rgba(76, 175, 80, 0.2)" : "rgba(211, 47, 47, 0.2)",
    },
}));
