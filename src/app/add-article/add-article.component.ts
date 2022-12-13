import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  constructor(private _http: HttpClient, private _authService: AuthService, private _articlesService: ArticlesService, private _router: Router) { }
  user = this._authService.user;
  isLoading = false;

  artName : any;
  artPrice: any;
  artPriceDevice: any;
  artCategory = '';
  artPicture: any;
  artDetails: any;
  pictureError = false;
  selectedPicture: any;
  categories = this._articlesService.categories;
  error :any;
  success : any;
  message : any;

  ngOnInit(): void {
  }
  getPicture(e: any) {
    let picture = e.target.files[0];
    if (/image/.test(picture.type)) {
      this.artPicture = e.target.files[0];
    } else {
      this.pictureError = true;
    }
  }
  getDevise(e: any) {
    this.artPriceDevice = e.target.value;
  }
  reload(){
    this.isLoading = false;
    this._router.navigate(['home']);
  }
  publish() {
    var formData = new FormData();
    formData.set('name', this.artName)
    formData.set('price', this.artPrice)
    formData.set('devise', this.artPriceDevice)
    formData.set('seller_id', `${this.user.id}`)
    formData.set('category', this.artCategory)
    formData.set('details', this.artDetails)
    if (this.artPicture != undefined) { formData.set('picture', this.artPicture) } else { return false; }
    this._http.post('http://127.0.0.1:4100/sell/add', formData).subscribe(
      (data : any) => {
        this.isLoading = true;
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
