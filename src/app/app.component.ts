import { Component, OnInit } from '@angular/core';
import { AppStorage } from 'src/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin  = false
  constructor(private _storage : AppStorage) {
    this.isLogin = this._storage.getKeyValue("isLogin") == "true" ? true : false;
  }

  ngOnInit(): void {
  }

}
