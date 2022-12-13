import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  constructor(private _http : HttpClient, private _authService : AuthService,private  _router : Router) { }
  
  myArticles : any[] = [];
  error :any;
  success : any;
  message : any;

  ngOnInit(): void {
    this._http.get('http://localhost:4100/articles/all').subscribe(
      (data : any) => {
        data.forEach((e : any) => {
        if(e.seller_id == this._authService.user.id){
            this.myArticles.push(e);
          }
        });
      },
      error => {
        console.error(error)
      }
    );
    
  }
  update(id : String){
    this._router.navigate(['settings/article-settings', {id : id}]);
  }
  setUnavailable(id : any, e : any){
    let password = prompt("Entrez votre mot de passe pour effectuer ce changement")
    if(password == null){ window.location.reload(); return;}
    this._http.post('http://localhost:4100/sell/set-unavailable', {
      article_id : id, 
      user_password : password, 
      user_id : this._authService.user.id,
      available : e.target.checked,
    }).subscribe(
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
  gotIt(){
    this.error = false;
    window.location.reload();
  }

}
