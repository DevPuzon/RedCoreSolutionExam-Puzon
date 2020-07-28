import { Component, OnInit, NgModule } from '@angular/core';
import { ModalController, IonicModule, LoadingController } from '@ionic/angular';
import { CustomBlobService } from 'src/app/Utils/customblob.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';
import { CustomHttpService } from 'src/app/Utils/custom-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlobModule } from 'angular-azure-blob-service'; 
import { environment } from 'src/environments/environment'; 
import { BlobstorageazureService } from 'src/app/Utils/blobstorageazure.service';
declare var $:any; 
@Component({
  selector: 'app-update-movis',
  templateUrl: './update-movis.component.html',
  styleUrls: ['./update-movis.component.scss'],
})
export class UpdateMovisComponent implements OnInit {

  updateForm: FormGroup; get f() { return this.updateForm.controls; }
  submitted=false;
  constructor(private modalCtrl:ModalController,
    private formBuilder:FormBuilder,
    private loadingController:LoadingController,
    private toast:ToastMessageService,
    private router : Router, 
    private route:ActivatedRoute,
    private cushttp:CustomHttpService) { 
      this.updateForm = this.formBuilder.group({
        thumbnail: ['', [Validators.required]],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        }, {    });  
   }

  ngOnInit() {
    this.movie_id =  this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  onBackClick(){
    window.history.back();
  }

  imgFile:any;
  movie_id:any;
  imgBitmap = "https://designshack.net/wp-content/uploads/placeholder-image.png";
  onChangeImg(file){
    if (file) {   
      console.log(this.updateForm);
      this.imgFile = file
      
      CustomBlobService.resize(file,140).then((data)=>{
        //console.log(data);
        this.imgBitmap = data; 
      });
      
    }
  }
  getImage(){ 
    $("#imgupdateMovie").click();
  }

  loading :any;
  async onUpdate(){
    this.submitted = true;
    console.log(this.updateForm); 
    this.loading = await this.loadingController.create({ message: "Please wait ...."  });
    this.loading.present(); 
 
   
    if(!this.f.thumbnail.errors ){ 
      BlobstorageazureService.uploadBlobToStorage(this.imgFile,this.movie_id)
      .then(async response => { 
        this.current_url = response._response.request.url; 
        var data = {
          "title" : this.updateForm.value.title,
          "description" : this.updateForm.value.description,
          "thumbnail" : this.current_url,
        } 
        
        this.cushttp.putExec("movies",data,this.movie_id)
        .subscribe((snap : any)=>{ 
          this.loading.dismiss();
          console.log(snap);
          this.toast.presentToast(snap.message);
          setTimeout(() => {
            window.location.reload()
          }, 1200);
        })
      }).catch(error => {    
        console.log(error);   
        this.loading.dismiss(); 
        this.toast.errorToast();
      }); 
    }else{
      var data = {
        "title" : this.updateForm.value.title,
        "description" : this.updateForm.value.description,
        "thumbnail" : this.current_url,
      } 
      
      this.cushttp.putExec("movies",data,this.movie_id)
      .subscribe((snap : any)=>{ 
        this.loading.dismiss();
        console.log(snap);
        this.toast.presentToast(snap.message);
        setTimeout(() => {
          window.location.reload()
        }, 1200);
      })
    }
  } 
  current_url = '';
  async getData(){
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    this.cushttp.getIdExec("movies",this.movie_id).subscribe((snap:any)=>{ 
      console.log(snap.data);
      this.current_url = snap.data.thumbnail;
      loading.dismiss();
      this.imgBitmap = snap.data.thumbnail;
      this.updateForm = this.formBuilder.group({
        thumbnail: ['', [Validators.required]],
        title: [snap.data.title, [Validators.required]],
        description: [snap.data.description, [Validators.required]],
      }, { 
    });  
    })

  }
}
