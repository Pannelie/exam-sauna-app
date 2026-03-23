import { styled, Paper, Box, Typography, keyframes } from "@mui/material";

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 0 0px rgba(25, 118, 210, 0.4); }
  50% { box-shadow: 0 0 15px 5px rgba(25, 118, 210, 0.2); }
  100% { box-shadow: 0 0 0 0px rgba(25, 118, 210, 0); }
`;

// Uppdatera slotProps med $isNew
const slotProps = ["isActive", "statusColor", "$isNew"];

export const StyledPaper = styled(Paper, {
    shouldForwardProp: (prop) => !slotProps.includes(prop as string),
})<{ isActive: boolean; statusColor: string; $isNew?: boolean }>`
    padding: 16px;
    margin-bottom: 8px;
    cursor: pointer;
    border-left: 6px solid ${(props) => props.statusColor};
    background: ${(props) => (props.isActive ? "#fdf5f0" : "#fff")};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    /* Glow-animation om kortet är nytt */
    animation: ${(props) => (props.$isNew ? `${glowAnimation} 3s ease-in-out infinite` : "none")};

    &:hover {
        transform: translateX(4px);
        background: #fafafa;
    }

    /* En extra visuell indikator (liten prick) om den är ny */
    ${(props) =>
        props.$isNew &&
        `
        &::after {
            content: "";
            position: absolute;
            top: 8px;
            right: 8px;
            width: 8px;
            height: 8px;
            background-color: #1976d2;
            border-radius: 50%;
        }
    `}
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
