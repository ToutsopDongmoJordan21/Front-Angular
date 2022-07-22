import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AccessoireService } from 'src/app/_services/accessoire.service';
import { BrandService } from 'src/app/_services/brand.service';
import { CarsService } from 'src/app/_services/cars.service';
import { Accessoire } from 'src/app/_services/entities/accessoire';
import { Brand } from 'src/app/_services/entities/brand';
import { Car } from 'src/app/_services/entities/car';
import { DocTypeEnum } from 'src/app/_services/entities/DocTypeEnum';
import { EntityFileTypeEnum } from 'src/app/_services/entities/EntityFileTypeEnum';
import { FileCreateDto } from 'src/app/_services/entities/FileCreateDto';
import { FileDto } from 'src/app/_services/entities/FileDto';
import { FileTypeEnum } from 'src/app/_services/entities/FileTypeEnum';
import { Fuel } from 'src/app/_services/entities/fuel';
import { PostCarDto } from 'src/app/_services/entities/PostCarDto';
import { FileServiceService } from 'src/app/_services/file-service.service';
import { FuelService } from 'src/app/_services/fuel.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  currentUser: any;
  form: any = {};
  id: number;
  car: Car;
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
  get carOverview() { return this.postCarForm.get('carOverview')}
  get carBrand() {return this.postCarForm.get('carBrand'); }
  get carLoanPrice() {return this.postCarForm.get('carLoanPrice'); }
  get carFuel() {return this.postCarForm.get('carFuel'); }
  get carPrice() {return this.postCarForm.get('carPrice'); }

  constructor(
    private token: TokenStorageService,
    private route: ActivatedRoute,
    private carService: CarsService,
    private brandService: BrandService,
    private fuelService: FuelService,
    private builder: FormBuilder,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private filesService: FileServiceService,
    private accessoireService: AccessoireService) { }

  ngOnInit() {

    
    this.currentUser = this.token.getUser();
    this.brands = this.brandService.findAll();
    this.fuels = this.fuelService.findAll();
    this.initForm();
    this.loadData();
    this.initSelectMultiple();
    
    this.car = new Car();

    this.id = this.route.snapshot.params['id'];
    //show spinner
    this.spinnerService.show();
  

    this.carService.getCars(this.id)
    .subscribe(data => {
      this.car = data;
    }, error => console.log(error));
    //hide method
    this.spinnerService.hide();
  }
  initForm() {
    
    this.postCarForm = this.builder.group({
      accessors: [null],
      carBrand: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      carFuel: [null, [Validators.required]],
      carLoanPrice: [null, [Validators.required]],
      carOverview: [null, [Validators.required]],
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

  updateCars() {
    //show spinner
    this.spinnerService.show();
    
    const carAccessors = [];
  
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
      garageId: 0
    };

   this.carService.updateCars(this.id, car)
     .subscribe(data => {
       fileCreateDto.carId = data.id;
       console.log(data);
       this.car = new Car();
       this.gotoList();
       alert('successful update');
     }, error => console.log(error));
     //hide method
     this.spinnerService.hide();
 }

 onSubmit() {
  this.updateCars();
 }

 gotoList() {
  this.router.navigate(['/profile']);
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

  change() {
  this.spinnerService.show();

  this.router.navigate(['profile']);

  this.spinnerService.hide();
  }

  list(id: number) {
    this.router.navigate(['detailsUserCars', this.currentUser.id])
  }

}
