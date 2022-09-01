import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Brad',
    description: 'The name of user',
  })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'test@gm.com',
    description: 'The email of user',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'userpassword',
    description: 'The user password',
  })
  readonly password: string;
}
