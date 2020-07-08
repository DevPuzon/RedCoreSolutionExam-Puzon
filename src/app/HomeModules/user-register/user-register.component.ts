import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CryptService } from 'src/app/Utils/crypt.service';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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
     private formBuilder : FormBuilder,
     private crypt:CryptService) {
    this.registerForm = this.formBuilder.group({
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
  onClickCreate(){
    this.submitted = true; 
    if(this.registerForm.invalid){
      return;
    }
    this.getResponse("https://run.mocky.io/v3/c9f65e72-2358-4453-8c82-82a2fbf3bed9")
    .subscribe((res:any)=>{
      this.toast.presentToast(res.message);  
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
