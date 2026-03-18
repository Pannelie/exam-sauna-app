import { styled, Paper, Box, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)<{ isActive: boolean; statusColor: string }>`
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

// export const TopIndicator = styled(Box)<{ statusColor: string }>(({ statusColor }) => ({
//     width: "40px",
//     height: "4px",
//     borderRadius: "2px",
//     backgroundColor: statusColor,
//     marginBottom: "8px",
// }));

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

export const StatusLabel = styled(Typography)<{ statusColor: string }>(({ statusColor }) => ({
    fontWeight: 900,
    color: statusColor,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    opacity: 0.8,
    fontSize: "0.75rem",
}));
