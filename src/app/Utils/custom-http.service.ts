import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  private base  ="https://redcoresolutiontestapi.azurewebsites.net/api/"; 
  private token  = "";
  constructor(private http:HttpClient,
    private crypt:CryptService) { 
    this.token ="Bearer "+ crypt.decryptData(localStorage.getItem("app_token"));
  }
  getExec(ctrl){ 
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token) 
    .set('content-type', 'application/json') 
    console.log(this.token);
    console.log(localStorage.getItem("app_token"));
    return this.http
    .get(url, { headers: headers })
  }
  getIdExec(ctrl,id){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') ;
    console.log(url);
    return this.http
    .get(url, { headers: headers })
  } 

  postExec(ctrl,body){
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    console.log("postExec");
    console.log(body);
    console.log(url);
    return this.http
    .post(url,body, { headers: headers })
  }
  putExec(ctrl,body,id){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    console.log(body);
    console.log(url);
    return this.http
    .put(url,body, { headers: headers })
  }
  
  delExec(ctrl,id){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    return this.http
    .delete(url, { headers: headers })
  } 

  
  postNoAuthExec(ctrl,body){
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    console.log("postExec");
    console.log(body);
    console.log(url);
    return this.http
    .post(url,body, { headers: headers })
  }
}
