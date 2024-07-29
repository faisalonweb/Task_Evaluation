export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  actions: {
    create: boolean;
    delete: boolean;
    view: boolean;
    move: boolean;
  };
  id?: string;
}
