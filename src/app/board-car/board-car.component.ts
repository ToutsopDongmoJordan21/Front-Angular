import {Component, OnInit} from '@angular/core';
import {Brand} from '../_services/entities/brand';
import {BrandService} from '../_services/brand.service';
import {Fuel} from '../_services/entities/fuel';
import {FuelService} from '../_services/fuel.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {Accessoire} from '../_services/entities/accessoire';
import {AccessoireService} from '../_services/accessoire.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileDto} from '../_services/entities/FileDto';
import {FileServiceService} from '../_services/file-service.service';
import {PostCarDto} from '../_services/entities/PostCarDto';
import {CarsService} from '../_services/cars.service';
import {FileCreateDto} from '../_services/entities/FileCreateDto';
import {DocTypeEnum} from '../_services/entities/DocTypeEnum';
import {EntityFileTypeEnum} from '../_services/entities/EntityFileTypeEnum';
import {FileTypeEnum} from '../_services/entities/FileTypeEnum';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-board-car',
  templateUrl: './board-car.component.html',
  styleUrls: ['./board-car.component.css']
})
export class BoardCarComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  private brands: Brand[];
  private fuels: Fuel[];
  accessors: Observable<Accessoire[]>;
  postCarForm: FormGroup;

  listDomUrl: Array<any> = new Array<any>();
  listRealFiles: Array<any> = new Array<any>();
  listOldFile: Array<FileDto> = new Array<FileDto>();
  listDeleteFile: Array<FileDto> = new Array<FileDto>();
  acceptImageInputFile = 'image/x-png,image/jpg,image/jpeg';
  totalFileSize = 0;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  get carTitle() {return this.postCarForm.get('carTitle'); }
  get carBrand() {return this.postCarForm.get('carBrand'); }
  get carLoanPrice() {return this.postCarForm.get('carLoanPrice'); }
  get carFuel() {return this.postCarForm.get('carFuel'); }
  get carPrice() {return this.postCarForm.get('carPrice'); }

  constructor(
    private brandService: BrandService,
    private fuelService: FuelService,
    private httpClient: HttpClient,
    private carService: CarsService,
    private builder: FormBuilder,
    private location: Location,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private filesService: FileServiceService,
    private accessoireService: AccessoireService) { }


  ngOnInit() {
    this.spinnerService.show();
    this.brands = this.brandService.findAll();
    this.fuels = this.fuelService.findAll();
    this.initForm();
    this.loadData();
    this.initSelectMultiple();
  }

  initSelectMultiple() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'accessoireName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 8,
      allowSearchFilter: true
    };
  }

  initForm() {
    this.postCarForm = this.builder.group({
      accessors: [null],
      carBrand: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      carFuel: [null, [Validators.required]],
      carLoanPrice: [null, [Validators.required]],
      carOverview: [null],
      carPrice: [null, [Validators.required]],
      carSeating: [null],
      carTitle: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      carYearModel: [null],
      images: [null]
    });
  }

  loadData() {
    this.accessoireService.findAllAccessors().then((value: any) => {
      this.accessors = value;
      this.spinnerService.hide();
    }).catch(reason => {
      console.log(reason);
      this.spinnerService.hide();
    });
  }

  // Gets called when the user clicks on submit to upload the image

  onSubmit() {
    this.spinnerService.show();
    const carAccessors = [];
    // tslint:disable-next-line:only-arrow-functions
    this.selectedItems.forEach(function(item, index, array) {
      carAccessors.push(item.id);
    });
    const car: PostCarDto = {
      accessors: carAccessors,
      carBrand: this.postCarForm.value.carBrand,
      carFuel: this.postCarForm.value.carFuel,
      carPrice: this.postCarForm.value.carPrice,
      carLoanPrice: this.postCarForm.value.carLoanPrice,
      carOverview: this.postCarForm.value.carOverview,
      carSeating: this.postCarForm.value.carSeating,
      carTitle: this.postCarForm.value.carTitle,
      carYearModel: this.postCarForm.value.carYearModel
    };
    const fileCreateDto: FileCreateDto = {
      type: DocTypeEnum.CAR_IMAGE,
      entity: EntityFileTypeEnum.CAR,
      fileType: FileTypeEnum.PHOTO,
      userId: 0,
      garageId: 0,
      fichierId: 0
    };
    this.carService.postRequest('/auth/cars', car).then((value: any) => {
      console.log(value);
      fileCreateDto.carId = value.id;
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
      } else  {
        this.router.navigate(['/']);
      }
    }).catch(reason => {
      alert(reason);
      console.log(reason);
      this.spinnerService.hide();
    });
    alert('vous venez de poster un car');
    console.log(this.listRealFiles);
    console.log(carAccessors);
    console.log(car);
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
      this.postCarForm.patchValue({images : null});
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
