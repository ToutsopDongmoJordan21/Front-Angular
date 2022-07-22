import { Component, OnInit } from '@angular/core';
import { ImageService } from '../_services/image.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.fileInfos = this.imageService.getFiles();
  }

  // selctionner la liste des files
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  // upload le file pour que cela s'affiche dans le front-end
  uploadFiles() {
    this.message = '';

    for(let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.imageService.upload(file).subscribe(
      event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
         } else if (event instanceof HttpResponse) {
           this.fileInfos = this.imageService.getFiles();
         }
      },
      // cas ou le file dépasse la limite
      err => {
        this.fileInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

}
