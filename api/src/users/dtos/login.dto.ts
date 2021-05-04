import {  IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
    @Length(4, 20)
    @IsNotEmpty()
    username: string;

    @Length(6)
    @IsNotEmpty()
    password: string;
}
