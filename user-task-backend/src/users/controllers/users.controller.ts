import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  /**
   * @returns all users
   */
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUser();
  }
  /**
   * @param id
   * @returns a single user
   */
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  /**
   * 
   * @param firstName
   * @param lastName
   * @param email
   * @param actions
   * @returns a new user and saves it first in the database
   */
  @Post()
  createUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('actions')
    actions: {
      create: boolean;
      delete: boolean;
      view: boolean;
      move: boolean;
    },
  ): Promise<User> {
    return this.userService.createUser(firstName, lastName, email, actions);
  }

  /**
   * 
   * @param id
   * @returns a message that the user is deleted from the database
   */
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return `user ${id} is deleted`;
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
  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('actions')
    actions: {
      create: boolean;
      delete: boolean;
      view: boolean;
      move: boolean;
    },
  ): Promise<User> {
    return this.userService.updateUser(id, firstName, lastName, email, actions);
  }
}
