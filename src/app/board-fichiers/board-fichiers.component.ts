import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileDto } from '../_services/entities/FileDto';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileServiceService } from '../_services/file-service.service';
import { FichierService } from '../_services/fichier.service';
import {PostFichierDto} from '../_services/entities/PostFichierDto';
import { FileCreateDto } from '../_services/entities/FileCreateDto';
import { DocTypeEnum } from '../_services/entities/DocTypeEnum';
import { EntityFileTypeEnum } from '../_services/entities/EntityFileTypeEnum';
import { FileTypeEnum } from '../_services/entities/FileTypeEnum';


@Component({
  selector: 'app-board-fichiers',
  templateUrl: './board-fichiers.component.html',
  styleUrls: ['./board-fichiers.component.css']
})
export class BoardFichiersComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;

  postFileForm: FormGroup;

  listDomUrl: Array<any> = new Array<any>();
  listRealFiles: Array<any> = new Array<any>();
  listOldFile: Array<FileDto> = new Array<FileDto>();
  listDeleteFile: Array<FileDto> = new Array<FileDto>();
  acceptImageInputFile = 'PDF,DOCS';
  totalFileSize = 0;

  get fichierTitle() {return this.postFileForm.get('fichierTitle');}
  get fichierAddedDate() {return this.postFileForm.get('fichierAddedDate');}

  constructor( private builder: FormBuilder,
          private location: Location,
          private router: Router,
          private spinnerService: NgxSpinnerService,
          private filesService: FileServiceService,
          private fichierService: FichierService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.initForm();
    this.spinnerService.hide();
  }

  initForm() {
    this.postFileForm = this.builder.group({
      fichierTitle: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      fichierAddedDate: [null],
      files: [null]
    });
  }

  onSubmit() {
    this.spinnerService.show();
    const fichier: PostFichierDto = {
      fichierTitle: this.postFileForm.value.fichierTitle,
      fichierAddedDate: this.postFileForm.value.fichierAddedDate
    };
    const fileCreateDto : FileCreateDto = {
      type: DocTypeEnum.FICHIER_IMAGE,
      entity: EntityFileTypeEnum.FICHIER,
      fileType: FileTypeEnum.PDF,
      userId: 0,
      garageId: 0,
      carId: 0
    };
    this.fichierService.postRequest('/auth/fichiers', fichier)
      .then((value: any) => {
        console.log(value);
        fileCreateDto.fichierId = value.id;
        if (this.listRealFiles.length > 0) {
          for (const file of this.listRealFiles) {
            this.filesService.saveFile(file, fileCreateDto).then((value1: any) => {
              console.log(value1);
              this.router.navigate(['/']);
            }).catch(reason => {
              alert(reason);
              console.log(reason);
              this.spinnerService.hide();
            });
          } 
        } else {
          this.router.navigate(['/']);
        } 
      }).catch(reason => {
        alert(reason);
        console.log(reason);
        this.spinnerService.hide();
    });
     alert('vous venez de sauvegarder un fichier');
    console.log(this.listRealFiles);
    console.log(fichier);
  }

  onBackClicked() {
    this.location.back();
  }

  /**
   * Sélectionner l'image et prévisualiser.
   * @param event
   */
  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (const file of files) {
        const reader = new FileReader();   // Prévisualisation de l'image sélectionné.
        reader.onload = (event: any) => {
          // Prévisualisation de l'image sélectionné.
          if (!(event.target.result.length * 8  > 8 ** 21)) {
            if (this.totalFileSize < 8) {
              this.listRealFiles.push(file);
              this.listDomUrl.push(event.target.result);
              this.totalFileSize += 1;
            } else {
              alert('Total file Exceedes 7');
            }
            // Ajouter à la liste des image que si la taille est <= a 5Mo.
          } else {
            alert('File exceeds the maximum size 5Mo');
          }
        };
        reader.readAsDataURL(file);
      }
      console.log(this.listDomUrl);
    }

  }

  /**
   * Retirer une image sélectionné.
   * @param url
   */
  removeFile(url: any) {
    const index: number = this.listDomUrl.indexOf(url);
    if (index !== -1) {
      this.listDomUrl.splice(index, 1);
      console.log(this.listDomUrl.length);
    }
    if ( this.listDomUrl.length <= 0 ) {
      this.postFileForm.patchValue({images : null});
    }
  }

  onRemoveOldFile(file: FileDto) {
    const index: number = this.listOldFile.indexOf(file);
    this.listDeleteFile.push(file);
    if (index !== -1) {
      this.listOldFile.splice(index, 1);
      console.log(this.listOldFile.length);
    }
  }


}
