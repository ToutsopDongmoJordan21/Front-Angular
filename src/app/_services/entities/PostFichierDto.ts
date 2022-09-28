import { FileDto } from './FileDto';

export class PostFichierDto {
    id?: string;
    fichierImages?: Array<FileDto>;
    fichierTitle?:string;
    fichierAddedDate?: Date;
}