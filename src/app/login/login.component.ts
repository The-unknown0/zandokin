import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public wrongNumber:any = '';
  public wrongPassWord:any = '';
  public userPassword:any;
  public userNumber:any;
  constructor(private _http: HttpClient, private _router : Router, private _route : ActivatedRoute,) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params : ParamMap)=>{
      if (!!params.get('pw') || !!params.get('num')) {
        this.userPassword = params.get('pw');
        this.userNumber = params.get('num');
      }
    })
  }
  onLogin(){
    let formData = new FormData();
    formData.set('number', this.userNumber);
    formData.set('password', this.userPassword)

    this._http.post('http://127.0.0.1:4100/users/login', formData).subscribe(
      (data : any) => {
        //console.log(data);
        if (data.token) {
          localStorage.setItem('zandokin-token', data.token);
          localStorage.setItem('zandokin-user-name', data.user.name);
          localStorage.setItem('zandokin-user-id', data.user.id);
          localStorage.setItem('zandokin-user-profil', data.user.profil);
          localStorage.setItem('zandokin-user-number', data.user.number);
          this._router.navigate(['home'], {skipLocationChange: false,});
          setTimeout(()=>{
            window.location.reload();
          }, 250)
        } else {
          if(data.found){
            this.wrongPassWord = data.message
          } else {
            this.wrongNumber = data.message
          }
        }
      },
      erro => {
        console.error(erro)
      }
      
    );
  }

}
