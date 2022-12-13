import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  loading = false;
  user = this._authService.user;
  name : any;
  oldPassword : any;
  newPassword : any;
  picture : any;
  error :any;
  success : any;
  message : any;
  
  constructor(private _authService : AuthService, private _http : HttpClient) { }

  ngOnInit(): void {
  }
  reload(){
    if (this.newPassword) {
      this._authService.updateToken(this.user.number, this.newPassword);
    } else {
      this._authService.updateToken(this.user.number, this.oldPassword);
    }
  }
  gotIt(){
    this.error = false;
    this.loading = false;
  }
  updateName(){
    this.loading = true;
    const password = prompt("Entrez votre mot de passe pour confirmer");
    this.oldPassword = password;
    let formData = new FormData();
    formData.set('number', `${this._authService.user.number}`);
    formData.set('password', `${password}`);
    formData.set('newName', `${this.user.name}`);
    
    this._http.post('http://127.0.0.1:4100/users/update', formData).subscribe(
      (data : any) => {
        this.success = true;
        this.message = data.message;
      },  
      error => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }
  updateNumber(){
    const password = prompt("Entrez votre mot de passe pour confirmer");
    let formData = new FormData();
    formData.set('id', `${this._authService.user.id}`);
    formData.set('password', `${password}`);
    formData.set('newName', `${this.user.name}`);
    this._http.post('http://127.0.0.1:4100/users/update', formData).subscribe(
      data => {
        //console.log(data)
        setTimeout(()=>{
          this._authService.updateToken(this.user.number, password)
        }, 250)
      },  
      error => {
        this.error = error.message;
        alert(error.error.message);
      }
    );
  }
  updatePassword(){
    let formData = new FormData();
    formData.set('number', `${this.user.number}`);
    formData.set('password', `${this.oldPassword}`);
    formData.set('newPassword', this.newPassword);
    this._http.post('http://127.0.0.1:4100/users/update', formData).subscribe(
      (data : any) => {
        this.success = true;
        this.message = data.message;
      },  
      error => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }
  updatePictureOnly(e: any){
    this.picture = e.target.files[0];
    const password = prompt("Entrez votre mot de passe pour confirmer");
    this.oldPassword = password;
    let formData = new FormData();
    formData.set('number', `${this.user.number}`);
    formData.set('password', `${password}`);
    formData.set('profil', this.picture);
    this._http.post('http://127.0.0.1:4100/users/update', formData).subscribe(
      (data : any) => {
        this.success = true;
        this.message = data.message;
      },  
      error => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }
  deleteAccount() {
    let formData = new FormData();
    const raison = prompt("Pourquoi supprimer le compte si vous pouvez nous aider à nous améliorer? envoyez-nous un commentaire s'il vous plait (facultatif)");
    if (raison != null && raison != '') {formData.set('reason', raison);}
    formData.set('number', `${this.user.number}`);
    formData.set('password', `${this.oldPassword}`);
    this._http.post('http://127.0.0.1:4100/users/delete', formData).subscribe(
      (data : any) => {
        this.success = true;
        this.message = data.message;
      },  
      error => {
        this.error = true;
        this.message = error.error.message;
      }
    );
    return true;
  }
}
