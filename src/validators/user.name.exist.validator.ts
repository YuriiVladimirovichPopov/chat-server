import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../03-users/infrastructure/users.repository';

@ValidatorConstraint({ name: 'UserLoginExists', async: true })
@Injectable()
export class IsUserNameExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validate(userName: string) {
    try {
      const existingUserByName =
        await this.usersRepository.findUserByName(userName);
      if (existingUserByName) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  defaultMessage() {
    return `This user's name already exists`;
  }
}
