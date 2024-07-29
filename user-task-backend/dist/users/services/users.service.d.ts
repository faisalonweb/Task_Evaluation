import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getAllUser(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(firstName: string, lastName: string, email: string, actions: {
        create: boolean;
        delete: boolean;
        view: boolean;
        move: boolean;
    }): Promise<User>;
    deleteUser(id: string): Promise<void>;
    updateUser(id: string, firstName: string, lastName: string, email: string, actions: {
        create: boolean;
        delete: boolean;
        view: boolean;
        move: boolean;
    }): Promise<User>;
}
