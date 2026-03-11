import "./textbox.css";
import { Typography } from "@mui/material";

type TextBoxProps = {
    title?: string;
    text?: string;
};
export const TextBox = ({ title, text }: TextBoxProps) => {
    if (!title && !text) {
        return null;
    }

    return (
        <div className="textbox_container">
            {title ? (
                <Typography variant="h3" className="textbox_title">
                    {title}
                </Typography>
            ) : (
                <Typography className="textbox_text textbox_text--only">{text}</Typography>
            )}
        </div>
    );
};
