import jwt from "jsonwebtoken";
import { throwError } from "../utils/throwError.mjs";

export const verifyAdminToken = () => ({
    before: (handler) => {
        const authHeader = handler.event.headers?.Authorization || handler.event.headers?.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return throwError("Saknar eller ogiltig Authorization-header", 401);
        }

        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            if (payload.role !== "admin") {
                return throwError("Otillräckliga rättigheter", 403);
            }
            handler.event.admin = payload;
        } catch {
            return throwError("Ogiltig eller utgången token", 401);
        }
    },
});
