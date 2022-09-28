import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FileCreateDto} from "./entities/FileCreateDto";

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private $http: HttpClient) { }

  private fileUrl = environment.baseUrl + '/file/';

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

  private extractData(res: HttpResponse<Object>) {
    let body;
    if (res) {
      body = res.body;
    }
    return body;
  }

  saveFile(file: File, dto: FileCreateDto): Promise<HttpResponse<Object>> {

    const formData: FormData = new FormData();
    // @ts-ignore
    formData.append('file', file);
    formData.append('type', dto.type.toString());
    formData.append('fileType', dto.fileType.toString());
    // @ts-ignore
    formData.append('carId', dto.carId);
    // @ts-ignore
    formData.append('garageId', dto.garageId);
    // @ts-ignore
    formData.append('userId', dto.userId);
    // @ts-ignore
    formData.append('fichierId', dto.fichierId);
    formData.append('entity', dto.entity.toString());

    return this.$http.post(environment.baseUrl + '/file/upload', formData, {observe: 'response', responseType: 'json'}).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
