interface TinyUser {
    id: string;
    fullName: string;
}

export interface LogData {
    user: TinyUser;
    update: boolean;
    createdAt: string;
};
