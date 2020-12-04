import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client-app';
  manager: any = null;

  ngOnInit() {
    const _mgr = sessionStorage.getItem('MGR_USR');
    if(_mgr) {
      this.manager = JSON.parse(_mgr);
    }
  }
}
