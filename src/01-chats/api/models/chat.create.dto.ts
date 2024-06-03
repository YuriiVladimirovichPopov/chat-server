import { Length, IsNotEmpty } from 'class-validator';
import { Trim } from 'src/decorators/transform/trim';

export class ChatCreateDto {
  @Length(3, 10, { message: 'Length must be from 3 to 10 symbols' })
  @Trim()
  @IsNotEmpty()
  name: string;
}
