export interface AlertData {
    open: boolean;
    message: string;
    severity: number;
    updateOpen: Function;
    updateMessage: Function;
    updateSeverity: Function;
}
