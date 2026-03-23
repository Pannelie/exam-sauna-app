import { Tooltip } from "@mui/material";

export const TooltipComponent = ({ title, children }: { title: string; children: React.ReactElement }) => {
    return (
        <Tooltip title={title} arrow placement="top">
            {children}
        </Tooltip>
    );
};
