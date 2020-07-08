import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {

  @ViewChild('TABLE', { static: false}) table: ElementRef;
 
  displayedColumns: string[] = 
  ['id',
   'name','mobile_number', 'address', 'note','action' ];
  dataSource = new MatTableDataSource();
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  fakeMovies=new Array<any>(); 
  constructor(private router: Router,
    private loadingController:LoadingController,
    private http: HttpClient,) { }

  async ngOnInit() {
    var loading = await this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    this.getResponse("https://run.mocky.io/v3/a748dff5-c187-41d1-9831-38263c4e6aa7")
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
