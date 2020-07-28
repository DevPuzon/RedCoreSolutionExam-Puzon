import { Component, OnInit, NgModule } from '@angular/core';
import { ModalController, IonicModule, LoadingController } from '@ionic/angular';
import { CustomBlobService } from 'src/app/Utils/customblob.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';
import { CustomHttpService } from 'src/app/Utils/custom-http.service';
import { Router } from '@angular/router';
import { BlobModule } from 'angular-azure-blob-service'; 
import { environment } from 'src/environments/environment'; 
import { BlobstorageazureService } from 'src/app/Utils/blobstorageazure.service';
import { UuidService } from 'src/app/Utils/uuid.service';
// import { UploadConfig, UploadParams, BlobService} from 'angular-azure-blob-service';
//  import {BlobStorageService } from 'stottle-angular-blob-storage/src/app/azure-storage/services/blob-storage.service';
declare var $:any; 
@Component({
  selector: 'app-addmovies',
  templateUrl: './addmovies.component.html',
  styleUrls: ['./addmovies.component.scss'],
})
export class AddmoviesComponent implements OnInit {

  addForm: FormGroup; get f() { return this.addForm.controls; }
  submitted=false;
  constructor(private modalCtrl:ModalController,
    private formBuilder:FormBuilder,
    private loadingController:LoadingController,
    private uuid:UuidService,
    private toast:ToastMessageService,
    private router : Router, 
    private cushttp:CustomHttpService) {
    this.addForm = this.formBuilder.group({
      thumbnail: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    }, { 
  }); }

  ngOnInit() {}

  onBackClick(){
    window.history.back();
  }

  imgFile:any;
  imgBitmap = "https://designshack.net/wp-content/uploads/placeholder-image.png";
  onChangeImg(file){
    if (file) {   
      console.log(this.addForm);
      this.imgFile = file
      
      CustomBlobService.resize(file,140).then((data)=>{
        //console.log(data);
        this.imgBitmap = data; 
      });
      
    }
  }
  getImage(){ 
    $("#imgAddMovie").click();
  }


  async onAdd(){
    this.submitted = true;
    console.log(this.addForm);
    if(this.addForm.invalid){
      return;
    } 
    var movie_id = this.uuid.makeid(5);
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    BlobstorageazureService.uploadBlobToStorage(this.imgFile,movie_id)
    .then(async response => { 
      var url = response._response.request.url;
      var data = {
        "movie_id":movie_id,
        "title" : this.addForm.value.title,
        "description" : this.addForm.value.description,
        "thumbnail" : url,
      } 
      
      this.cushttp.postExec("movies",data)
      .subscribe((snap : any)=>{ 
        loading.dismiss();
        console.log(snap);
        this.toast.presentToast(snap.message);
        setTimeout(() => {
          window.location.reload()
        }, 1200);
      })

     }).catch(error => {    
       console.log(error);   
       loading.dismiss(); 
       this.toast.errorToast();
     });  
 
  }
}
