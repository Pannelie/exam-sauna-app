import "./HomeSection.css";
import React from "react";

type HomeSectionProps = {
    id?: string;
    children: React.ReactNode;
    className?: string;
};

export const HomeSection = React.forwardRef<HTMLElement, HomeSectionProps>(({ id, children, className }, ref) => {
    const sectionClassName = className ? `home_basic-section ${className}` : "home_basic-section";
    return (
        <section id={id} className={sectionClassName} ref={ref}>
            {children}
        </section>
    );
});
