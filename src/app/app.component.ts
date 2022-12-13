import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isConnected = this._authService.checkConnexion();
  public found : any;
  public average : any;
  
  constructor(private _router: Router, private _authService : AuthService, private _http: HttpClient,){}
  
  
  goToArticles(what:any, id : any){
      this._router.navigate(['article', what, id]);
  }
  detailFoundArticle(category :any, id : any){
    this._router.navigate([`home/detail-article/636bfd45be5442dbc0d54ac9
    `]);
  }
  searchArticle(e : any){
    if (e.target.value == '') {return}
    this._http.get(`http://localhost:4100/articles/search?name=${e.target.value}`).subscribe(
        (data : any) => {
          this.found = data;
          this.average = data.length;
        },
        error => {
          console.error(error)
        })
  }
}
