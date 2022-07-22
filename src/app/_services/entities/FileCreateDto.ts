import {DocTypeEnum} from './DocTypeEnum';
import {EntityFileTypeEnum} from './EntityFileTypeEnum';
import {FileTypeEnum} from './FileTypeEnum';

export class FileCreateDto {
  type: DocTypeEnum;
  entity: EntityFileTypeEnum;
  fileType: FileTypeEnum;
  carId?: number;
  garageId?: number;
  userId?: number;
}
