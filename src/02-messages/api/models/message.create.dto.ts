import { IsString, Length, IsNotEmpty } from 'class-validator';
import { Trim } from 'src/decorators/transform/trim';

export class MessageCreateDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @Length(1, 1000, { message: 'Length must be from 1 to 1000 symbols' })
  @Trim()
  @IsNotEmpty()
  text: string;
}
