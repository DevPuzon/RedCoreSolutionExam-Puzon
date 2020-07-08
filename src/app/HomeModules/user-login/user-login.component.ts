import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  submitted=false;
  loginForm: FormGroup;// convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  constructor(private router:Router,
    private route:ActivatedRoute,
    private http: HttpClient,
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
    this.getResponse("https://run.mocky.io/v3/8ac4d947-89d7-47e0-8f1c-960c9c770f85")
    .subscribe(async (res:any)=>{
      loading.dismiss();
      this.toast.presentToast(res.message);  
      localStorage.setItem("example_user_only",res.email); 
      await this.router.navigateByUrl('');
      setTimeout(() => {
        window.location.reload();
      }, 200);
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
