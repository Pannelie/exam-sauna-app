import type { BookingFormData } from "../types/bookingTypes";
import { StepDates } from "./../components/Steps/StepDates";
import { StepContact } from "./../components/Steps/StepContact";
import { StepSummary } from "./../components/Steps/StepSummary";

export const useStepContent = (
    activeStep: number,
    formData: BookingFormData,
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void,
    handlers: { next: () => void; back: () => void; complete: () => void; reset: () => void; isCompleted: boolean },
) => {
    const { next, back, complete, reset, isCompleted } = handlers;

    const stepMap = [
        <StepDates key="dates" data={formData} updateField={updateField} next={next} />,
        <StepContact key="contact" data={formData} updateField={updateField} next={next} back={back} />,
        <StepSummary key="summary" data={formData} back={back} complete={complete} reset={reset} isCompleted={isCompleted} />,
    ];

    return stepMap[activeStep];
};
