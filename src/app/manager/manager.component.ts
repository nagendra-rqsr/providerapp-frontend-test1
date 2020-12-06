import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  manager: any = null;
  constructor() { }

  ngOnInit(): void {
    const _mgr = sessionStorage.getItem('MGR_USR');
    if(_mgr) {
      this.manager = JSON.parse(_mgr);
    }
  }

}
