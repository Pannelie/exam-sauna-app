import { styled, Paper, Box, Typography } from "@mui/material";

const slotProps = ["isActive", "statusColor"];

export const StyledPaper = styled(Paper, {
    // Only forward props to the DOM if they are NOT in our custom list
    shouldForwardProp: (prop) => !slotProps.includes(prop as string),
})<{ isActive: boolean; statusColor: string }>`
    padding: 16px;
    margin-bottom: 8px;
    cursor: pointer;
    border-left: 6px solid ${(props) => props.statusColor};
    background: ${(props) => (props.isActive ? "#fdf5f0" : "#fff")};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
        transform: translateX(4px);
        background: #fafafa;
    }
`;

export const ContentBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const ActionWrapper = styled(Box)({
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
});

export const StatusLabel = styled(Typography, {
    shouldForwardProp: (prop) => !slotProps.includes(prop as string),
})<{ statusColor: string }>(({ statusColor }) => ({
    fontWeight: 900,
    color: statusColor,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    opacity: 0.8,
    fontSize: "0.75rem",
}));
