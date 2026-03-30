import type { BookingFormData } from "../../../types/bookingTypes";
import { StepDates } from "./../components/Steps/StepDates";
import { StepContact } from "./../components/Steps/StepContact";
import { StepSummary } from "./../components/Steps/StepSummary";

export const useStepContent = (
    activeStep: number,
    formData: BookingFormData,
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void,
    handlers: { next: () => void; back: () => void; complete: () => void; reset: () => void; isCompleted: boolean },
    errors: Record<string, string>,
    // Ny parameter för extra data
    mobileData: { isMobile: boolean },
) => {
    const { next, back, complete, reset, isCompleted } = handlers;
    const { isMobile } = mobileData;

    const stepMap = [
        <StepDates
            key="dates"
            data={formData}
            updateField={updateField}
            next={next}
            errors={errors}
            // Skicka ner datan till StepDates
            isMobile={isMobile}
        />,
        <StepContact key="contact" data={formData} updateField={updateField} next={next} back={back} errors={errors} isMobile={isMobile} />,
        <StepSummary
            key="summary"
            data={formData}
            back={back}
            complete={complete}
            reset={reset}
            isCompleted={isCompleted}
            isMobile={isMobile}
        />,
    ];

    return stepMap[activeStep];
};
