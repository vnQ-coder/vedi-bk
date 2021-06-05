import { SessionUserType } from "../../src/modules/public/auth/types/AuthTypes";

declare module "express-session" {
    export interface SessionData {
        user: SessionUserType;
    }
}
