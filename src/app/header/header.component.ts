import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isConnected = this._authService.checkConnexion();
  public found : any;
  public average : any;

  constructor(private _router: Router, private _authService : AuthService, private _http: HttpClient,) { }

  ngOnInit(): void {
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
  goToArticles(art : any){
    //this._router.navigate([`/article;what=category;id=${art.category}#${art.picture}`]);/* #${art.picture} */
    this._router.navigate([`/article`, { what : 'category', id : art.category,}]);
  }
}
