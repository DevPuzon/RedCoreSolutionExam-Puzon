import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AddmoviesComponent } from '../addmovies/addmovies.component';
import { CustomHttpService } from 'src/app/Utils/custom-http.service';
import { ToastMessageService } from 'src/app/Utils/toast-message.service';
@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.scss'],
})
export class AdminMoviesComponent implements OnInit {

  @ViewChild('TABLE', { static: false}) table: ElementRef;
 
  displayedColumns: string[] = 
  ['movie_id',
   'thumbnail','title', 'description', 'rate','createdAt','updatedAt','action' ];
  dataSource = new MatTableDataSource();
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  datas=new Array<any>(); 
  constructor(private router: Router,
    private modalController : ModalController,
    private custoHttp:CustomHttpService,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private toast :ToastMessageService,
    private http: HttpClient,) { }

  async ngOnInit() {
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present();  
    this.custoHttp.getExec("movies").subscribe((snap:any)=>{
      this.datas = snap.data; 
      console.log(snap.data);
      loading.dismiss(); 
      this.dataSource = new MatTableDataSource(this.datas);
    })

  }
 

  async addMovies(){ 
    this.router.navigateByUrl("/admin/add-movies");
  }

  updateMovies(movie_id){
    this.router.navigateByUrl('/admin/update-movies/'+movie_id);
  }
  async deleteMovies(movie_id){ 
    const alert = await this.alertController.create({ 
      header: 'Delete',
      message: 'Do you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          cssClass: 'danger',
          handler: () => {  
            this.custoHttp.delExec("movies",movie_id)
            .subscribe((snap : any)=>{  
              console.log(snap);
              this.toast.presentToast(snap.message);
              setTimeout(() => {
                window.location.reload()
              }, 1200);
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
 