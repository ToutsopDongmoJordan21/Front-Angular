import { FileDto } from './FileDto';

export class PostCarDto {
  id?: string;
  accessors?: Array<number>;
  accessorsName?: Array<string>;
  carAddedDate?: Date;
  carImages?: Array<FileDto>;
  postByName?: String;
  carBrand?: string;
  carFuel?: string;
  carLoanPrice?: string;
  carOverview?: string;
  carPrice?: string;
  carSeating?: string;
  carTitle?: string;
  carYearModel?: string;
}
