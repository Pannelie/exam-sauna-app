import "./HomeSection.css";

type HomeSectionProps = {
    id?: string;
    children: React.ReactNode;
    className?: string;
};

export function HomeSection({ id, children, className }: HomeSectionProps) {
    const sectionClassName = className ? `home_basic-section ${className}` : "home_basic-section";

    return <section id={id} className={sectionClassName}>{children}</section>;
}
