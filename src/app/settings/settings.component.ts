import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private _router : Router, private _route : ActivatedRoute) { }

  ngOnInit(): void {
  }
  goToSpecificSetting(route : String){
    this._router.navigate([route], {relativeTo : this._route});
  }
}
