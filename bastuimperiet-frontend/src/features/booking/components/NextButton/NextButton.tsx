import { Button } from "@mui/material";

interface NextButtonProps {
    onClick: () => void;
}

export const NextButton = ({ onClick }: NextButtonProps) => {
    return <Button onClick={onClick}>Nästa steg</Button>;
};
