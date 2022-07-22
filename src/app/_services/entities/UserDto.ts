import { FileDto } from "./FileDto";

export class UserDto {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    phoneNumber?: string;
    userImages?: Array<FileDto>;
}