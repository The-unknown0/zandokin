import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private _router : Router, private _http: HttpClient) { }
  checkConnexion(){
    return !!localStorage.getItem('zandokin-token');
  }
  getToken(){
    return localStorage.getItem('zandokin-token');
  }
  updateToken(userNumber : any, userPassword : any){
    let formData = new FormData();
    formData.set('number', userNumber);
    formData.set('password', userPassword)
    localStorage.clear();
    setTimeout(()=>{
    this._http.post('http://127.0.0.1:4100/users/login', formData).subscribe(
      (data : any) => {
        //console.log(data);
        if (data.token) {
          localStorage.setItem('zandokin-token', data.token);
          localStorage.setItem('zandokin-user-name', data.user.name);
          localStorage.setItem('zandokin-user-id', data.user.id);
          localStorage.setItem('zandokin-user-profil', data.user.profil);
          localStorage.setItem('zandokin-user-number', data.user.number);
          window.location.reload();
          //alert("");
        } else {
          //console.log(data);
          window.location.reload();
        }
      },
      error => {
        window.location.reload();
      }
    );
  }, 250);
  }
  logout(){
    localStorage.removeItem('zandokin-token');
    localStorage.removeItem('zandokin-user-name');
    localStorage.removeItem('zandokin-user-id');
    localStorage.removeItem('zandokin-user-number');
    localStorage.removeItem('zandokin-user-profil');
    this._router.navigate(['home'], {skipLocationChange: false,});
          setTimeout(()=>{
            window.location.reload();
          }, 250)
  }
  user = {
    "id": localStorage.getItem('zandokin-user-id'),
    "name": localStorage.getItem('zandokin-user-name'),
    "profil": localStorage.getItem('zandokin-user-profil'),
    "number": localStorage.getItem('zandokin-user-number')
  }
}
