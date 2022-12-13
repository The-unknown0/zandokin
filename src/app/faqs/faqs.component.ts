import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FAQsComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }
  navigateTo(where : any){
    this._router.navigate([where]);
  }
}
