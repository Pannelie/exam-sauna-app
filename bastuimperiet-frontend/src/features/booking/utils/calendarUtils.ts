/** Formaterar datum till YYYY-MM-DD */
export const toDateStr = (date: Date | string): string => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

type CalendarEventLike = {
    title?: string;
    start: Date | string;
    end?: Date | string;
};

/** Lägger till en dag på ett datum-sträng */
export const getNextDay = (dateStr: string): string => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    return toDateStr(d);
};

/** Skapar ett Set av blockerade datumsträngar baserat på bokningar */
export const calculateBlockedDates = (events: CalendarEventLike[]): Set<string> => {
    const blocked = new Set<string>();
    events?.forEach((e) => {
        if (typeof e.title === "string" && e.title.startsWith("Bokning:") && e.end) {
            let curr = new Date(toDateStr(e.start));
            const endStr = toDateStr(e.end);

            while (toDateStr(curr) < endStr) {
                blocked.add(toDateStr(curr));
                curr.setDate(curr.getDate() + 1);
            }
        }
    });
    return blocked;
};

/** Kontrollerar om ett valt intervall krockar med existerande bokningar */
export const hasOverlap = (startStr: string, endStr: string, blockedDates: Set<string>): boolean => {
    let tempDate = new Date(startStr);
    const targetDate = new Date(endStr);

    while (toDateStr(tempDate) < toDateStr(targetDate)) {
        if (blockedDates.has(toDateStr(tempDate))) {
            return true;
        }
        tempDate.setDate(tempDate.getDate() + 1);
    }
    return false;
};
