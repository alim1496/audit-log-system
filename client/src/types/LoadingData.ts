import React from "react";

export interface LoadingData {
    loading: boolean;
    click: React.MouseEventHandler;
    text: string;
    styles: React.CSSProperties;
    width: boolean;
    start?: React.ReactNode;
};
