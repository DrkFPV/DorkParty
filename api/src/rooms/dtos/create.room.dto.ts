import { IsNotEmpty, IsOptional, validate, ValidateIf } from 'class-validator';
export class CreateRoomDto{
    @IsNotEmpty()
    name: string;

    @ValidateIf(o => o !== undefined)
    isPrivate?: boolean = false

    @ValidateIf(o => o.isPrivate === 'true')
    @IsNotEmpty()
    password?: string = ""
}