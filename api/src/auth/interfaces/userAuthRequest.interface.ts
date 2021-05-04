import { Request } from "express"

export interface IUserAuthRequest extends Request{
    user: {username:string, userId:string}
}