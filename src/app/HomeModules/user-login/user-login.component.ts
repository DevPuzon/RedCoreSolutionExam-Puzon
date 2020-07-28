import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/Utils/custom-http.service';
import { CryptService } from 'src/app/Utils/crypt.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  submitted=false;
  loginForm: FormGroup; 
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
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
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
      email:this.loginForm.value.email,
      password:this.loginForm.value.password 
    }
    this.cusHttp.postNoAuthExec("user/access",data)
    .subscribe(async (res:any)=>{  
      if(res.access_token != null){ 
        localStorage.setItem("app_token",this.crypt.encryptData(res.access_token));
        this.toast.presentToast(res.message); 
        setTimeout(async () => {  
          await this.router.navigateByUrl('');
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
