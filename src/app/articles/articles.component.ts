import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles : any;
  public what : any;
  id : any;
  isDetailling : any;
  latests : any;
  solded : any;
  categories = this._articleService.categories;
  constructor(private _route : ActivatedRoute, private _router : Router, private _http : HttpClient, private _articleService : ArticlesService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params : ParamMap)=>{
      this.id = params.get('id');
      this.what = params.get('what');
      this._http.get(`http://localhost:4100/articles/category?id=${this.id}`).subscribe(
        (data : any) => {
        this.articles = data;
        },
        erro => {
          console.error(erro)
        })
    })
    this._http.get('http://localhost:4100/articles/three-latest').subscribe(
      (data : any) => {
       this.latests = data;
      },
      erro => {
        console.error(erro)
      }
    );
    this._http.get('http://localhost:4100/articles/price-updated').subscribe(
      (data : any) => {
       this.solded = data;
      },
      erro => {
        console.error(erro)
      }
    );
    
    }
    changecategory(what:any, id : any){
      this._router.navigate(['article', {what : what, id : id}]);
  }
    detailArticle(id : any){
      this._router.navigate([`detail-article/${id}`], {relativeTo : this._route});
      this.isDetailling = true;
    }
    closeDetail(){
      this._router.navigate(['article', {what : this.what, id : this.id}]);
      this.isDetailling = false;
    }
}

