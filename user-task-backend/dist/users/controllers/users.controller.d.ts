import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(firstName: string, lastName: string, email: string, actions: {
        create: boolean;
        delete: boolean;
        view: boolean;
        move: boolean;
    }): Promise<User>;
    deleteUser(id: string): Promise<string>;
    updateUser(id: string, firstName: string, lastName: string, email: string, actions: {
        create: boolean;
        delete: boolean;
        view: boolean;
        move: boolean;
    }): Promise<User>;
}
