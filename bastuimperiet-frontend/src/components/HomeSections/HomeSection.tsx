import "./HomeSection.css";

type HomeSectionProps = {
    id: string;
    children: React.ReactNode;
    className?: string;
};

export function HomeSection({ id, children, className }: HomeSectionProps) {
    return (
        <section id={id} className={`home_basic-section ${className}`}>
            {children}
        </section>
    );
}
