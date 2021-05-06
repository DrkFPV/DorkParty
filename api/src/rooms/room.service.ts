import { BadRequestException, Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { IUserAuthRequest } from "src/auth/interfaces/userAuthRequest.interface";
import { CreateRoomDto } from "./dtos/create.room.dto";
import { Room, RoomDocument } from "./schemas/room.schema";


@Injectable({ scope: Scope.REQUEST })
export class RoomService{
    constructor(@InjectModel('Room') private readonly roomModel: Model<RoomDocument>,
    @Inject(REQUEST) private readonly request: IUserAuthRequest) {}
    
    async search(searchString:String): Promise<Room[]>{
        return await this.roomModel.find( {'roomName': { $regex: `.*${searchString}*.`,},   }).select(["-hash"]);
    }
    
    async create(createRoomDto:CreateRoomDto): Promise<Room | any>{
        let createdHash:string = '';
        if (Boolean(createRoomDto.isPrivate)){
            if (createRoomDto.password === undefined)
            {
                throw new BadRequestException();
            }
            createdHash = await bcrypt.hash(createRoomDto.password, 10)   
        }
        await this.roomModel.create(
            {roomName: createRoomDto.name,
            adminId: this.request.user.userId, 
            adminName: this.request.user.username,
            isPrivate: createRoomDto.isPrivate,
            hash: createdHash});
        
        return {"Success":"Room Created!"}
    }
    
    async update(){}

    async delete(roomId:String): Promise<Room>{
        return await this.roomModel.remove({id:roomId, adminId: this.request.user.userId})
    }
    
    async findOne(roomId:string): Promise<Room>{
        return await this.roomModel.findOne({id: roomId});
    }
}