import { Component, OnInit } from '@angular/core';
import { Garage } from 'src/app/_services/entities/garage';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GarageService } from 'src/app/_services/garage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileDto } from 'src/app/_services/entities/FileDto';
import { Location } from '@angular/common';
import { FileServiceService } from 'src/app/_services/file-service.service';
import { FileCreateDto } from 'src/app/_services/entities/FileCreateDto';
import { DocTypeEnum } from 'src/app/_services/entities/DocTypeEnum';
import { EntityFileTypeEnum } from 'src/app/_services/entities/EntityFileTypeEnum';
import { FileTypeEnum } from 'src/app/_services/entities/FileTypeEnum';
import { GarageDto } from 'src/app/_services/entities/GarageDto';

@Component({
  selector: 'app-create-garage',
  templateUrl: './create-garage.component.html',
  styleUrls: ['./create-garage.component.css']
})
export class CreateGarageComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  postGarageForm: FormGroup;
  submitted = false;

  listDomUrl: Array<any> = new Array<any>();
  listRealFiles: Array<any> = new Array<any>();
  listOldFile: Array<FileDto> = new Array<FileDto>();
  listDeleteFile: Array<FileDto> = new Array<FileDto>();
  acceptImageInputFile = 'image/x-png,image/jpg,image/jpeg';
  totalFileSize = 0;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  get garageName() {return this.postGarageForm.get('garageName'); }
  get garageAddress() {return this.postGarageForm.get('garageAddress');}

  constructor(private route: ActivatedRoute,
    private builder: FormBuilder,
    private location: Location,
    private router: Router,
    private garageService: GarageService,
    private SpinnerService: NgxSpinnerService,
    private fileService: FileServiceService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.initForm();
    this.SpinnerService.hide();
  }

  initForm() {
    this.postGarageForm = this.builder.group({
      garageName: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      garageAddress: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      images: [null]
    })
  }

  onSubmit() {
    this.SpinnerService.show();
    const garage: GarageDto = {
      garageAddress: this.postGarageForm.value.garageAddress,
      garageName: this.postGarageForm.value.garageName
    };

    const fileCreateDto: FileCreateDto = {
      type: DocTypeEnum.GARAGE_IMAGE,
      entity: EntityFileTypeEnum.GARAGE,
      fileType: FileTypeEnum.PHOTO,
      userId: 0,
      carId: 0
    };
    this.garageService.postRequest('/auth/garage', garage).then((value: any) => {
      console.log(value);
      fileCreateDto.garageId = value.id;
      if(this.listRealFiles.length > 0) {
        for(const file of this.listRealFiles) {
          this.fileService.saveFile(file, fileCreateDto).then((value1: any) => {
            console.log(value1);
            this.router.navigate(['/garage']);
          }).catch(reason => {
            alert(reason);
            console.log(reason);
            this.SpinnerService.hide();
          });
        }
      } else {
        this.router.navigate(['/garage']);
      }
    }).catch(reason => {
      alert(reason);
      console.log(reason);
      this.SpinnerService.hide();
    });
    alert('vous venez de poster un garage');
    console.log(this.listRealFiles);
    console.log(garage);
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
          if (!(event.target.result.length * 5  > 5 ** 21)) {
            if (this.totalFileSize < 5) {
              this.listRealFiles.push(file);
              this.listDomUrl.push(event.target.result);
              this.totalFileSize += 1;
            } else {
              alert('Total file Exceedes 5');
            }
            // Ajouter à la liste des image que si la taille est <= a 5Mo.
          } else {
            alert('File exceeds the maximum size 5Mo');
          }
        };
        reader.readAsDataURL(file);
      }
      console.log(this.listDomUrl);
      console.log(this.listRealFiles);
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
        this.postGarageForm.patchValue({images : null});
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
