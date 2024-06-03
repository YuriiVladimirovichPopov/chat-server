import { IsNotEmpty, Length } from 'class-validator';
import { IsUserNameExist } from '../../../decorators/validation/user.name.exist.decorator';
import { Trim } from '../../../decorators/transform/trim';



export class UserCreateDto {
  @IsUserNameExist()
  @Length(3, 10, { message: 'Length must be from 3 to 10 symbols' })
  @Trim()
  @IsNotEmpty()
  username: string;
}
