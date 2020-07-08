import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  hasuser='';
  fakeMovies : any;
 
  constructor(private router: Router,
    private loadingController:LoadingController,
    private http: HttpClient,) {
    if(localStorage.getItem("example_user_only")){
      this.hasuser = localStorage.getItem("example_user_only");
    }
  }
  async ngOnInit(): Promise<void> { 
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    this.getResponse("https://run.mocky.io/v3/f72a8ae9-e741-4c51-a469-d231e46bcfe4")
    .subscribe(res=>{
      loading.dismiss();
      this.fakeMovies = res;
      // console.log(res);
    });
  }

  onClickRent(item){
    console.log(item);
    if(this.hasuser == ''){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['viewmovie',item.id]);
    }
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
 
