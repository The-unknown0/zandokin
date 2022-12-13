import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-article-settings',
  templateUrl: './article-settings.component.html',
  styleUrls: ['./article-settings.component.css']
})
export class ArticleSettingsComponent implements OnInit {
  

  constructor(private _http : HttpClient, 
    private _authService: AuthService, 
    private _route: ActivatedRoute, 
    private _articlesService : ArticlesService
    ) { }
  
  id : any;
  article : any;
  myArticles : any[] = [];
  average : Number | undefined;
  loading = false;
  user = this._authService.user;
  picture : any;
  password: any;
  categories = this._articlesService.categories;
  devises = this._articlesService.devises;
  deletingPassword : any;
  error :any;
  success : any;
  message : any;
  updateArticle(id : String = this.id, form : any){
    this._http.post('http://127.0.0.1:4100/sell/update', form.form.value).subscribe(
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
  reload(){
    window.location.reload();
  }
  updatePictureOnly(e: any){
    this.picture = e.target.files[0];
    var password = prompt("Entrez votre mot de passe pour effectuer ce changement")
    if(password == null){ window.location.reload(); return;}
    var formData = new FormData();
    formData.set('user_id', `${this.user.id}`);
    formData.set('user_password', password);
    formData.set('artId', this.id);
    formData.set('picture', this.picture);
    this._http.post('http://127.0.0.1:4100/sell/update', formData).subscribe(
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
  deleteArticle() {
    var formData = new FormData();
    formData.set('user_id', `${this.user.id}`);
    formData.set('user_password', this.deletingPassword);
    formData.set('artId', this.id);
    this._http.post('http://127.0.0.1:4100/sell/delete', formData).subscribe(
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
  ngOnInit(): void {
    this._http.get('http://localhost:4100/articles/all').subscribe(
      (data : any) => {
        data.forEach((e : any) => {
        if(e.seller_id == this._authService.user.id){
            this.myArticles.push(e);
          }
        });
        this.average = this.myArticles.length
      },
      error => {
        console.error(error)
      }
    );
    this._route.paramMap.subscribe((params : ParamMap)=>{
      if(this.id = params.get('id')){
      this._http.get(`http://localhost:4100/articles/detail?id=${this.id}`).subscribe(
        (data : any) => {
        this.article = data;
        },
        error => {
          console.error(error)
        })
    }})
  }

}
