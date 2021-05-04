import { Document } from 'mongoose';

export interface IUser{
    username:string;
    hash:string;
}