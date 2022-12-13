import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {


  ngOnInit(): void {
  }
  public isConnected = this._authService.checkConnexion();
  user_name = this._authService.user.name;
  user = this._authService.user;
  categories = this._artService.categories;
  constructor(private _router: Router, private _authService : AuthService, private _artService :ArticlesService){}
  title = 'front-end-zk';
  logOut(){
    this._authService.logout();
  }
  goToArticles(what:any, id : any){
      this._router.navigate(['article', {what : what, id : id}]);
  }
  addAnArticle(){
    this._router.navigate(['add-article']);
}
}
