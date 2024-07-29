import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * 
   * @returns all users
   */
  getAllUser(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   *
   * @param id
   * @returns a single user by id
   */
  getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   *
   * @param firstName
   * @param lastName
   * @param email
   * @param actions
   * @returns a new user and saves it first in the database
   */
  createUser(
    firstName: string,
    lastName: string,
    email: string,
    actions: {
      create: boolean;
      delete: boolean;
      view: boolean;
      move: boolean;
    },
  ): Promise<User> {
    const user = this.usersRepository.create({
      firstName,
      lastName,
      email,
      actions,
    });
    return this.usersRepository.save(user);
  }

  /**
   * @param id 
   * @returns a message that the user is deleted from the database after deleting the user
   */
  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  /**
   * 
   * @param id
   * @param firstName
   * @param lastName
   * @param email
   * @param actions
   * @returns the updated user from the database after updating it first
   */
  async updateUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    actions: {
      create: boolean;
      delete: boolean;
      view: boolean;
      move: boolean;
    },
  ): Promise<User> {
    await this.usersRepository.update(id, {
      firstName,
      lastName,
      email,
      actions,
    });
    return this.getUserById(id);
  }
}
