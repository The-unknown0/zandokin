import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleModel } from '../article-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _http : HttpClient, private _router :Router, private _route : ActivatedRoute) { }

  isDetailling = false;
  public articles : any;
  sports : any[] = [];
  phones : any[] = [];
  vetements : any[] = [];
  bijoux : any[] = [];
  electro : any[] = [];
  auto : any[] = [];
  latests : any[] = [];
  hotsellings : any[] = [];
  solded : any[] = [];
  ngOnInit(): void {
    this._http.get('http://localhost:4100/articles/all').subscribe(
      (data : any) => {
       this.articles = data;
        this.getBasicCategoryData(data,this.sports,"sport");
        this.getBasicCategoryData(data,this.phones,"téléphone");
        this.getBasicCategoryData(data,this.vetements,"vetement");
        this.getBasicCategoryData(data,this.bijoux,"bijoux");
        this.getBasicCategoryData(data,this.electro,"electro");
        this.getBasicCategoryData(data,this.auto,"automobile");
      },
      erro => {
        console.error(erro)
      }
    );
    this._http.get('http://localhost:4100/articles/three-latest').subscribe(
      (data : any) => {
       this.latests = data;
      },
      erro => {
        console.error(erro)
      }
    );
    /* this._http.get('http://localhost:4100/articles/hot-selled').subscribe(
      (data : any) => {
       this.articles = data;
      },
      erro => {
        console.error(erro)
      }
    ); */
    this._http.get('http://localhost:4100/articles/price-updated').subscribe(
      (data : any) => {
       this.solded = data;
      },
      erro => {
        console.error(erro)
      }
    );
  }
  getBasicCategoryData(data : any, category : any, id : any){
    this.articles = data;
    data.forEach((e : any) => {
     if(e.category == id){
          category.push(e);
       }
     });
  }

  goToArticles(what:any, id : any){
    this._router.navigate(['article', {what : what, id : id}]);
  }
  detailArticle(id : any){
    this._router.navigate([`detail-article/${id}`], {relativeTo : this._route});
    this.isDetailling = true;
  }
  closeDetail(){
    this._router.navigate(['home']);
    this.isDetailling = false;
  }
}
