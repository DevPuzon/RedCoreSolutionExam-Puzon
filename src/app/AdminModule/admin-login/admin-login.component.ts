import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/Utils/custom-http.service';
import { CryptService } from 'src/app/Utils/crypt.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {

  submitted=false;
  loginForm: FormGroup;// convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  constructor(private router:Router,
    private route:ActivatedRoute,
    private http: HttpClient,
    private cusHttp:CustomHttpService,
    private crypt:CryptService,
    private loadingController:LoadingController,
    private toast:ToastMessageService,
    private formBuilder: FormBuilder) {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(4)]],
      }, { 
      });
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
  onSignUp(){
   
    this.router.navigate(['register'])
  }

  async onClickLogin(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    } 
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    var data ={ 
      email:this.loginForm.value.username,
      password:this.loginForm.value.password 
    }
    this.cusHttp.postNoAuthExec("user/access",data)
    .subscribe(async (res:any)=>{  
      console.log(res);
      if(res.access_token != null){ 
        localStorage.setItem("app_token",this.crypt.encryptData(res.access_token));
        setTimeout(async () => {  
          await this.router.navigateByUrl('admin');
          window.location.reload();
        }, 2200);
      }else{
        loading.dismiss();
        this.toast.presentToast(res.Error);
      }
    });
  }

  getResponse(url){
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('content-type', 'application/json') 
    return this.http
    .get(url, { headers: headers })
  } 
  

}
