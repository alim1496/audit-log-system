import { createContext } from "react";
import { AlertData } from "../types/AlertData";

const LogContext = createContext<AlertData>({
    open: false,
    message: "",
    severity: 1,
    updateOpen: () => {},
    updateMessage: () => {},
    updateSeverity: () => {}
});

export const LogContextConsumer = LogContext.Consumer;
export const LogContextProvider = LogContext.Provider;
export default LogContext;
