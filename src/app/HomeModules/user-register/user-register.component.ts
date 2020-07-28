import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CryptService } from 'src/app/Utils/crypt.service';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/Utils/custom-http.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  submitted=false;
  registerForm: FormGroup;// convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
   
  constructor(private router:Router ,
    private http: HttpClient,
     private toast:ToastMessageService,
     private route:ActivatedRoute,
     private cusHttp:CustomHttpService,
     private loadingController :LoadingController,
     private formBuilder : FormBuilder,
     private crypt:CryptService) {
    this.registerForm = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile_number:['',[Validators.required,Validators.pattern('^(09|\\+639)\\d{9}$')]]
    }, { 
    });
    var datas = crypt.decryptData(localStorage.getItem('-=[],.us'));
    
  }
 
  ngOnInit() { 
  }
  imgPass = "eye";
  typePass="password";
  onClickShow(){ 
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
    this.imgPass = this.imgPass === 'eye-off' ? 'eye' : 'eye-off';
  } 

  onClickRouter(urlrouter){
    this.router.navigate(urlrouter);
  }
  async onClickCreate(){
    this.submitted = true; 
    if(this.registerForm.invalid){
      return;
    }
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    var data ={
      full_name:this.registerForm.value.full_name,
      email:this.registerForm.value.email,
      password:this.registerForm.value.password,
      role:"User"
    }
    this.cusHttp.postExec("user",data)
    .subscribe(async (res:any)=>{
      loading.dismiss();
      this.toast.presentToast(res.message);   
      await this.router.navigateByUrl('/login');
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }
 
}
