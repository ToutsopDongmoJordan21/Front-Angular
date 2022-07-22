import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_services/entities/user';
import { NgxSpinnerService } from "ngx-spinner";
import { FileDto } from 'src/app/_services/entities/FileDto';
import { FileServiceService } from 'src/app/_services/file-service.service';
import { FileCreateDto } from 'src/app/_services/entities/FileCreateDto';
import { DocTypeEnum } from 'src/app/_services/entities/DocTypeEnum';
import { EntityFileTypeEnum } from 'src/app/_services/entities/EntityFileTypeEnum';
import { FileTypeEnum } from 'src/app/_services/entities/FileTypeEnum';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isSuccessful = false;
  submitted = false;
  id: number;
  user: User;

  listDomUrl: Array<any> = new Array<any>();
  listRealFiles: Array<any> = new Array<any>();
  listOldFile: Array<FileDto> = new Array<FileDto>();
  listDeleteFile: Array<FileDto> = new Array<FileDto>();
  acceptImageInputFile = 'image/x-png,image/jpg,image/jpeg';
  totalFileSize = 0;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor( private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private SpinnerService: NgxSpinnerService,
    private fileService: FileServiceService) { }

  ngOnInit() {
    this.user = new User();

    this.id = this.route.snapshot.params['id'];
    //show spinner
    this.SpinnerService.show();
  

    this.userService.getUser(this.id)
    .subscribe(data => {
      console.log(data)
      this.user = data;
    }, error => console.log(error));
    //hide method
    this.SpinnerService.hide();
  }

  updateUser() {
     //show spinner
     this.SpinnerService.show();

     const fileCreateDto: FileCreateDto = {
      type: DocTypeEnum.PROFILE_IMAGE,
      entity: EntityFileTypeEnum.USER,
      fileType: FileTypeEnum.PHOTO,
      garageId: 0,
      carId: 0
    };

    this.userService.updateRequest(this.id, this.user).then((value: any) => {
      console.log(value);
      fileCreateDto.userId = value.id;
      if(this.listRealFiles.length > 0) {
        for(const file of this.listRealFiles) {
          this.fileService.saveFile(file, fileCreateDto).then((value1: any) => {
            console.log(value1);
            this.router.navigate(['/profile']);
          }).catch(reason => {
            alert(reason);
            console.log(reason);
            this.SpinnerService.hide();
          });
        }
      } else {
        this.router.navigate(['/profile']);
      }
    }).catch(reason => {
      alert(reason);
      console.log(reason);
      this.SpinnerService.hide();
    });
    alert('You have updated your information successfully');
    console.log(this.listRealFiles);
    console.log(this.user);
    /* this.userService.updateUser(this.id, this.user)
      .subscribe(data => {
        console.log(data);
        this.user = new User();
        this.gotoList();
        alert('successful update');
      }, error => console.log(error));
      //hide method
      this.SpinnerService.hide(); */
  }

  onSubmit() {
    this.updateUser();
  }

  gotoList() {
    this.router.navigate(['/profile']);
  }

  change() {
    this.SpinnerService.show();

    this.router.navigate(['profile']);

    this.SpinnerService.hide();
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
}


}
