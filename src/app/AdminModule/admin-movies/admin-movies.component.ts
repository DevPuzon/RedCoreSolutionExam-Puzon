import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.scss'],
})
export class AdminMoviesComponent implements OnInit {

  @ViewChild('TABLE', { static: false}) table: ElementRef;
 
  displayedColumns: string[] = 
  ['id',
   'cover','name', 'desc', 'rate','action' ];
  dataSource = new MatTableDataSource();
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  fakeMovies=new Array<any>(); 
  constructor(private router: Router,
    private loadingController:LoadingController,
    private http: HttpClient,) { }

  async ngOnInit() {
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    this.getResponse("https://run.mocky.io/v3/f72a8ae9-e741-4c51-a469-d231e46bcfe4")
    .subscribe((res:any)=>{
      loading.dismiss();
      this.fakeMovies = res;
      this.dataSource = new MatTableDataSource(this.fakeMovies);
      // console.log(res);
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
 