export function scrollToSection(ref: React.RefObject<HTMLElement>, offset: number = 0) {
    const element = ref.current;
    if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const top = rect.top + scrollTop - offset;
        window.scrollTo({ top, behavior: "smooth" });
    }
}
