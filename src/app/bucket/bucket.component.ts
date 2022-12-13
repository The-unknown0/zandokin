import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {

  constructor(private _http : HttpClient, private _authService : AuthService,private  _router : Router, private _route : ActivatedRoute) { }

  isDetailling = false;
  myBucket : any[] = [];
  error :any;
  success : any;
  message : any;

  ngOnInit(): void {
    this._http.get('http://localhost:4100/bucket/my-bucket?id='+this._authService.user.id).subscribe(
      (data : any) => {
        this.myBucket = data;
       //console.log(data)
      },
      error => {
        console.error(error)
      }
    );
  }

  detailArticle(id : any){
    this._router.navigate([`detail-article/${id}`], {relativeTo : this._route});
      this.isDetailling = true;
  }
  closeDetail(){
    this._router.navigate(['bucket']);
    this.isDetailling = false;
    this.error = this.success = false 
  }/* ?id='+this._authService.user.id */
  removeFromBucket(id : any){
    this._http.delete('http://127.0.0.1:4100/bucket/delete?id='+id).subscribe(
      (data : any) => {
        this.success = true
       //console.log(data)
       this.message = data.message;
      },
      error => {
        console.error(error)
        this.error = true;
        this.message = error.error.message;
      }
    );
  }
  reload(){
    window.location.reload()
  }
}
