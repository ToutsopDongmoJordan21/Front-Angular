import { FileDto } from "./FileDto";

export class Garage {
    id: Number;
    garageName: String;
    garageAddress: String;   
    garageImages: Array<FileDto>;
}