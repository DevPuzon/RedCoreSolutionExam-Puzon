import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit { 
  public appPages = [
    {
      title: 'Movies',
      url: 'movies',
      icon: 'videocam',  
    }, 
    // {
    //   title: 'Users',
    //   url: 'users',
    //   icon: 'people',  
    // }, 
  ]; 
  constructor(private router:Router,
    private route:ActivatedRoute,
    private http: HttpClient,
    private loadingController:LoadingController,
    private toast:ToastMessageService,
    private formBuilder: FormBuilder) { 
  } 
  ngOnInit() {
    this.router.navigateByUrl("/admin/movies");
  } 
  async onClickMenu(index){ 
    this.router.navigate(['admin',this.appPages[index].url]);
  }
  
}
