import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUserNameExistValidator } from '../../validators/user.name.exist.validator';

export function IsUserNameExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserLoginExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUserNameExistValidator,
    });
  };
}
