import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  constructor(private _http : HttpClient, private _router : Router) { }
  userName = '';
  userNumber = '';
  picture : any;
  picturePlaceholder : any;
  userPassword = '';
  generatedPassword : any;
  numberAlreadyUsed = false;
  pictureError = false;
  isLoading = false;
  error :any;
  success : any;
  message : any;

  ngOnInit(): void {
  }
  getProfil(e: any){
    let picture = e.target.files[0];
    console.log(picture)
    if (/image/.test(picture.type)) {
      this.picture = e.target.files[0];
      this.pictureError = false;
    } else {
      this.pictureError = true;
    }
  }
  async generatePassword(){
    let name = '';
    let number = '';
    await this.userName.split('', 5).forEach(val => {
      name += val;
    })
    await this.userNumber.split('', 5).forEach(val => {
      number += val;
    })
    this.generatedPassword = `${name}_${number}`;
  }
  navigateToLogin(number : any){
    this._router.navigate(['log-in', {num : number, }])
  }
  reload(){
    this._router.navigate(['log-in', {pw : this.userPassword, num : '+243'+this.userNumber}])
  }
  verifyNumber(value : any){
    if (value.length >= 9) {
        this._http.get(`http://127.0.0.1:4100/users/numbers?number=${value}`).subscribe(
        (data : any) => {
          if (data.found) {
            this.numberAlreadyUsed = true;
          } else {
            this.numberAlreadyUsed = false;
          }
        },  
        error => {
          console.log(error);
        }
      );
    }
  }
  signUp(){
    let formData = new FormData();
    formData.set('name', this.userName);
    formData.set('number', '+243'+this.userNumber);
    formData.set('password', this.userPassword);
    if(this.picture != undefined){formData.set('profil', this.picture);}

    this._http.post('http://127.0.0.1:4100/users/sign-up', formData).subscribe(
      (data : any) => {
        this.success = true;
        this.message = data.message;
        this.isLoading = true;
      },  
      error => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }

}
