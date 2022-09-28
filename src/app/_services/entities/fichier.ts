import { FileDto } from "./FileDto";

export class Fichier {
    id: Number;
    fichierTitle: String;
    fichierAddedDate: Date;
    fichierImages: Array<FileDto>
}