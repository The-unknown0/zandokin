import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  constructor(private _http : HttpClient, private _authService : AuthService, private _route : ActivatedRoute,  private _router: Router, ) { }
  user = this._authService.user
  id : String | any;
  article : any;
  artDate : any;
  error :any;
  success : any;
  message : any;
  async ngOnInit() {
    await this._route.paramMap.subscribe((params : ParamMap)=>{
      this.id = params.get('id');
      this._http.get(`http://localhost:4100/articles/detail?id=${this.id}`).subscribe(
        (data : any) => {
        this.article = data;
        this.calculateDate(data.date);
        },
        error => {
          console.error(error)
        })
    })
    
  }
  goToArticles(what:any, id : any){
    this._router.navigate(['article', {what : what, id : id}]);
  }
  calculateDate(date : any){
    const Y = (date : any) => {return date.getFullYear()};
    const m = (date : any) => {return date.getMonth()}
    const d = (date : any) => {return date.getDate()};
    const h = (date : any) => {return date.getHours()};
    const i = (date : any) => {return date.getMinutes()};
    const now = new Date();
    const ad = new Date(date);
    if (Y(now) == Y(ad)) {
        //check the month
        if (m(now) == m(ad)) {
            if (m(now) == m(ad)) {
                //check the day
                if (d(now) == d(ad)) {
                    //check hours
                    if (h(now) == h(ad)) {
                        //check minutes
                        if (i(now) == i(ad)) {
                            this.artDate ="Maintenant";
                            //check minutes
                        } else {
                            if((i(now) - i(ad)) > 1){
                                this.artDate ="il y a "+ (i(now) - i(ad)) + " mins";
                            } else {
                                this.artDate ="il y a 1 min";
                            }
                        }
                    } else if((h(now) - h(ad)) > 1 ) {
                        this.artDate =h(ad)+":"+i(ad);
                    } else {
                        this.artDate ="il y a une heure";
                    }
                } else {
                    if((d(now) - d(ad)) > 1 ){
                        this.artDate =ad.toLocaleDateString();
                    } else {
                        this.artDate ="hier à "+ad.toLocaleTimeString();
                    }
                }
            } else {
                
            }
        } else {
            if((m(now) - m(ad)) > 1 ){
                this.artDate =ad.toLocaleDateString();
            } else {
                this.artDate =ad.toLocaleDateString();
            }
        }
    } else {
        this.artDate = ad.toLocaleDateString();
    }
    }
  putInBucket(id : any){
    var formData = new FormData();
    formData.set('artId', id);
    formData.set('userId',`${this.user.id}`);
    this._http.post('http://127.0.0.1:4100/bucket/put-in-bucket', formData).subscribe(
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
  update(id : String){
    this._router.navigate(['settings/article-settings', {id : id}]);
  }
  gotIt(){
    this.error = false;
    this.success = false;
  }
}
