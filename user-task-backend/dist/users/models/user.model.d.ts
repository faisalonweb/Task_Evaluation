export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    actions: {
        create: boolean;
        delete: boolean;
        view: boolean;
        move: boolean;
    };
}
