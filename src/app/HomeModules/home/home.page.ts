import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomHttpService } from 'src/app/Utils/custom-http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  hasuser=''; 
  datas = new Array<any>();
  constructor(private router: Router,
    private custoHttp :CustomHttpService,
    private loadingController:LoadingController,
    private http: HttpClient,) {
    if(localStorage.getItem("example_user_only")){
      this.hasuser = localStorage.getItem("example_user_only");
    }
  }
  async ngOnInit(): Promise<void> { 
  
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present();  
    this.custoHttp.getExec("movies").subscribe((snap:any)=>{
      this.datas = snap.data; 
      console.log(snap.data);
      loading.dismiss();  
    })

  }

  async onClickRent(data,isrent){ 
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    data.isrented = isrent;
    this.custoHttp.putExec("movies/rented",data,data.movie_id)
    .subscribe((snap : any)=>{ 
      loading.dismiss();
      console.log(snap);
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1200);
    })
  }
   
  
  onClickRouter(urlrouter){
    this.router.navigate(urlrouter);
  }
  onClickLogout(){
    this.router.navigateByUrl("");
    this.hasuser = "";
    localStorage.removeItem("example_user_only")
  }

  
  getResponse(url){
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('content-type', 'application/json') 
    return this.http
    .get(url, { headers: headers })
  } 
}
 
