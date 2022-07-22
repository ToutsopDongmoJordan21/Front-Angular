import { FileDto } from "./FileDto";

export class GarageDto {
  id?: string;
  garageName?: string;
  garageAddress?: string;  
  garageImages?: Array<FileDto>;
}