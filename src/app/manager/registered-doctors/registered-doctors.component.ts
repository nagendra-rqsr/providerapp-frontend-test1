import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registered-doctors',
  templateUrl: './registered-doctors.component.html',
  styleUrls: ['./registered-doctors.component.scss']
})
export class RegisteredDoctorsComponent implements OnInit {
  registered_doctors: any[] = [];
  isActiveDirty = false;
  site_value = '';

  constructor(
    private appService: AppService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let _mgr: any = sessionStorage.getItem('MGR_USR');
    if(!_mgr) {
      this.router.navigate(['/']);
    }
    let manager = JSON.parse(_mgr);
    if (environment.production) {
      const site = this.appService.all_sites.find(x => x.id == manager?.site_id);
      if (site) {
        this.site_value = site.name;
      }
    } else {
      this.site_value = 'BP' + manager.site_id
    }
    
    this.getResiteredDoctors();
  }

  getResiteredDoctors() {
    this.appService.getRegisteredDoctors(this.site_value).subscribe((data) => {
      this.registered_doctors = data;
    });
  }

  onRegisterDoctor() {
    this.router.navigate(['/manager/register-doctor'])
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  onIsActiveToggle(doc: any) {
    doc.isActive = !doc.isActive;
    this.isActiveDirty = true;
  }

  submit() {
    this.appService.updateRegisteredDoctors(this.registered_doctors).subscribe((resp) => {
      alert('updated');
      this.getResiteredDoctors();
    });
  }

}
