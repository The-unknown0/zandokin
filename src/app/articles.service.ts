import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  categories = [
    {id : 'service', name : 'Service'},
    {id : 'téléphone', name : 'Téléphone'},
    {id : 'beauté', name : 'Beauté & Hygiène'},
    {id : 'sport', name : 'Sport'},
    {id : 'brico', name : 'Bricolage'},
    {id : 'electro', name : 'Electro ménagers'},
    {id : 'immo', name : 'Immobiliers'},
    {id : 'informatique', name : 'Informatique'},
    {id : 'jeux', name : 'Jeux & jeux vidéos'},
    {id : 'automobile', name : 'Automobile'},
    {id : 'vetement', name : 'Vetements'},
    {id : 'accessoires', name : 'Accessoires'},
    {id : 'déco', name : 'Décoration & intérieur'},
    {id : 'photographie', name : 'Photographie'},
    {id : 'bijoux', name : 'Bijoux & Fantaisies'},
]
  devises = [
    {id : '$', name : 'Dollars $'},
    {id : 'Fc', name : 'Franc congolais'},
  ]
  public articles : any;
  sports : any[] = [];
  phones : any[] = [];
  vetements : any[] = [];
  bijoux : any[] = [];
  electro : any[] = [];
  auto : any[] = [];
  latests : any[] = [];
  hotsellings : any[] = [];
  public solded : any[] = [];
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
    this._http.get('http://localhost:4100/articles/price-updated').subscribe(
      (data : any) => {
       this.solded = data;
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
  }
  getAll(){
    this._http.get('http://localhost:4100/articles/all').subscribe(
      (data : any) => {
       return data;
      },
      erro => {
        console.error(erro)
      })
  }
  getBasicCategoryData(data : any, category : any, id : any){
    this.articles = data;
    data.forEach((e : any) => {
     if(e.category == id){
          category.push(e);
       }
     });
  }
  getArticleById(data : any, category : any, id : any){
    this.articles = data;
    data.forEach((e : any) => {
     if(e.category == id){
          category.push(e);
       }
     });
  }
  constructor(private _http : HttpClient, private _router :Router) { }

}
