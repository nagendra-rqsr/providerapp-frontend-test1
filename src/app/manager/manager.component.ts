import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  manager: any = null;
  site_value = '';

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    const _mgr = sessionStorage.getItem('MGR_USR');
    if(_mgr) {
      this.manager = JSON.parse(_mgr);
      if (environment.production) {
        const site = this.appService.all_sites.find(x => x.id == this.manager?.site_id);
        if (site) {
          this.site_value = site.name;
        }
      } else {
        this.site_value = 'BP' + this.manager.site_id
      }
    }
  }

}
