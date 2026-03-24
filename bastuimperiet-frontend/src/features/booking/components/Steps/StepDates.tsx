import { Stack, Typography, Button, Box } from "@mui/material";
import { FormButton } from "../FormButton/FormButton";
import type { BookingFormData } from "../../../../types/bookingTypes";
import { TotalPrice } from "../TotalPrice/TotalPrice";
import { MyDateInput } from "../MyDateInput/MyDateInput";
import { StepExtras } from "./StepExtras/StepExtras";
import { useState } from "react";
import { ClientCalendarCustomer } from "../ClientCalendar/ClientCalendar";
import { MobileBottomSheet } from "../../../../components/MobileBottomSheet/MobileBottomSheet";

interface StepDatesProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    next: () => void;
    errors: Record<string, string>;
    isMobile: boolean;
    events: any[];
}

export const StepDates = ({ data, updateField, next, errors, isMobile, events }: StepDatesProps) => {
    const [calendarOpen, setCalendarOpen] = useState(false);

    const formatFullDateTime = (dateStr: string) => {
        if (!dateStr) return "";
        return dateStr;
    };

    const dateLabel =
        data.startDate && data.endDate
            ? `${formatFullDateTime(data.startDate)} — ${formatFullDateTime(data.endDate)}`
            : "Tryck för att välja datum";

    return (
        <section className="step_container" style={isMobile ? { padding: "12px 4px", margin: 0 } : {}}>
            <Stack direction="column" spacing={isMobile ? 1 : 2}>
                {/* --- MOBIL: Visa Button som öppnar Drawer --- */}
                {isMobile ? (
                    <Box sx={{ mb: 0.5 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => setCalendarOpen(true)}
                            color={errors.startDate || errors.endDate ? "error" : "primary"}
                            sx={{
                                p: 1.5,
                                mt: 0.5,
                                justifyContent: "flex-start",
                                textTransform: "none",
                                borderRadius: "10px",
                                border: "1px solid rgba(0, 0, 0, 0.18)",
                                backgroundColor: "#fff",
                            }}
                        >
                            <Typography variant="body2" sx={{ color: data.startDate ? "text.primary" : "text.secondary" }}>
                                {dateLabel}
                            </Typography>
                        </Button>
                        {(errors.startDate || errors.endDate) && (
                            <Typography color="error" variant="caption" sx={{ ml: 0.5, mt: 0.2 }}>
                                {errors.startDate || errors.endDate}
                            </Typography>
                        )}
                    </Box>
                ) : (
                    /* --- DESKTOP: Dina vanliga inputs (Ingen kalender här) --- */
                    <Stack direction="row" spacing={2}>
                        <MyDateInput
                            label="Startdatum (15:00)"
                            value={data.startDate || null}
                            onChange={(val) => updateField("startDate", val)}
                            error={!!errors.startDate}
                            helperText={errors.startDate}
                        />
                        <MyDateInput
                            label="Slutdatum (11:00)"
                            value={data.endDate || null}
                            onChange={(val) => updateField("endDate", val)}
                            error={!!errors.endDate}
                            helperText={errors.endDate}
                        />
                    </Stack>
                )}
            </Stack>
            {/* Extras & Pris (syns alltid) */}

            <Stack spacing={isMobile ? 2 : 4} sx={{ mt: isMobile ? 1 : 2 }}>
                <StepExtras data={data} updateField={updateField} />
                <TotalPrice />
                <FormButton type="next" variant="contained" onClick={next} text="Nästa steg" isMobile={isMobile} />
            </Stack>
            {/* --- MOBIL-ONLY: Swipeable Drawer --- */}
            <MobileBottomSheet open={isMobile && calendarOpen} onClose={() => setCalendarOpen(false)}>
                {/* En wrapper för att ge lite luft åt sidorna men inte skapa en "box i box" */}
                <Box sx={{ p: 2 }}>
                    <ClientCalendarCustomer
                        events={events}
                        startDate={data.startDate}
                        endDate={data.endDate}
                        onDateSelect={(start: string, end: string) => {
                            updateField("startDate", start);
                            updateField("endDate", end);
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setCalendarOpen(false)}
                        sx={{
                            mt: 1, // Minskat avstånd
                            py: 1.2,
                            borderRadius: "10px",
                            fontWeight: "bold",
                            backgroundColor: "#eebc62", // Din guldgula färg
                        }}
                    >
                        Klar
                    </Button>
                </Box>
            </MobileBottomSheet>
        </section>
    );
};
//     return (
//         <section className="step_container" style={isMobile ? { padding: "12px 4px", margin: 0 } : {}}>
//             <Stack direction="column" spacing={isMobile ? 1 : 2}>
//                 {/* --- MOBIL: Visa "Bottom Sheet"-knapp --- */}
//                 {isMobile ? (
//                     <Box sx={{ mb: 0.5 }}>
//                         <Typography variant="caption" sx={{ color: "text.secondary", ml: 0.5, fontWeight: "bold" }}>
//                             Vald period
//                         </Typography>
//                         <Button
//                             variant="outlined"
//                             fullWidth
//                             onClick={() => setCalendarOpen(true)}
//                             color={errors.startDate || errors.endDate ? "error" : "primary"}
//                             sx={{
//                                 p: 1.2,
//                                 mt: 0.2,
//                                 justifyContent: "flex-start",
//                                 textTransform: "none",
//                                 borderRadius: "10px",
//                                 border: "1px solid rgba(0, 0, 0, 0.18)",
//                                 backgroundColor: "#fff",
//                                 minHeight: 36,
//                             }}
//                         >
//                             <Typography variant="body2" sx={{ color: data.startDate ? "text.primary" : "text.secondary" }}>
//                                 {dateLabel}
//                             </Typography>
//                         </Button>
//                         {(errors.startDate || errors.endDate) && (
//                             <Typography color="error" variant="caption" sx={{ ml: 0.5, mt: 0.2 }}>
//                                 {errors.startDate || errors.endDate}
//                             </Typography>
//                         )}
//                     </Box>
//                 ) : (
//                     /* --- DESKTOP: Visa dina vanliga inputs --- */
//                     <Stack direction="row" spacing={2}>
//                         <MyDateInput
//                             label="Startdatum (15:00)"
//                             value={data.startDate || null}
//                             onChange={(val) => updateField("startDate", val)}
//                             error={!!errors.startDate}
//                             helperText={errors.startDate}
//                         />
//                         <MyDateInput
//                             label="Slutdatum (11:00)"
//                             value={data.endDate || null}
//                             onChange={(val) => updateField("endDate", val)}
//                             error={!!errors.endDate}
//                             helperText={errors.endDate}
//                         />
//                     </Stack>
//                 )}
//             </Stack>

//             {/* Extras & Pris (syns alltid) */}
//             <Stack spacing={isMobile ? 2 : 4} sx={{ mt: isMobile ? 1 : 2 }}>
//                 <StepExtras data={data} updateField={updateField} />
//                 <TotalPrice />
//                 <FormButton type="next" variant="contained" onClick={next} text="Nästa steg" isMobile={isMobile} />
//             </Stack>

//             {/* --- MOBIL-MODAL (Bottom Sheet) --- */}
//             <Dialog
//                 open={calendarOpen}
//                 onClose={() => setCalendarOpen(false)}
//                 fullScreen={isMobile}
//                 TransitionComponent={Transition}
//                 PaperProps={{
//                     sx: {
//                         borderRadius: isMobile ? 0 : "20px",
//                         maxHeight: isMobile ? "100%" : "90vh",
//                     },
//                 }}
//             >
//                 <Box
//                     sx={{
//                         p: isMobile ? 1 : 2,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         borderBottom: "1px solid #eee",
//                     }}
//                 >
//                     <Typography variant="h6" sx={isMobile ? { fontSize: 18 } : {}}>
//                         Välj datum
//                     </Typography>
//                     <IconButton onClick={() => setCalendarOpen(false)}>
//                         <CloseIcon />
//                     </IconButton>
//                 </Box>

//                 <DialogContent sx={{ p: isMobile ? 0.5 : 1 }}>
//                     <ClientCalendarCustomer
//                         events={events}
//                         startDate={data.startDate}
//                         endDate={data.endDate}
//                         onDateSelect={(start: string, end: string) => {
//                             updateField("startDate", start);
//                             updateField("endDate", end);
//                         }}
//                     />
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         onClick={() => setCalendarOpen(false)}
//                         sx={{ mt: isMobile ? 1 : 2, py: isMobile ? 1 : 1.5, borderRadius: "10px", fontSize: isMobile ? 15 : undefined }}
//                     >
//                         Klar
//                     </Button>
//                 </DialogContent>
//             </Dialog>
//         </section>
//     );
// };

//  <Drawer
//                 anchor="bottom"
//                 open={!!id && isMobile}
//                 onClose={() => setCalendarOpen(false)}
//                 disableEnforceFocus
//                 ModalProps={{
//                     keepMounted: true,
//                 }}
//                 PaperProps={{ sx: { height: "85vh", borderTopLeftRadius: 32, borderTopRightRadius: 32 } }}
//             >
//                 <Box sx={{ p: 2 }}>
//                     <ClientCalendarCustomer
//                         events={events}
//                         startDate={data.startDate}
//                         endDate={data.endDate}
//                         onDateSelect={(start: string, end: string) => {
//                             updateField("startDate", start);
//                             updateField("endDate", end);
//                         }}
//                     />
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         onClick={() => setCalendarOpen(false)}
//                         sx={{ mt: isMobile ? 1 : 2, py: isMobile ? 1 : 1.5, borderRadius: "10px", fontSize: isMobile ? 15 : undefined }}
//                     >
//                         Klar
//                     </Button>
//                 </Box>
//             </Drawer>
