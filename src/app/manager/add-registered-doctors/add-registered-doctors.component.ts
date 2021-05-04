import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-registered-doctors',
  templateUrl: './add-registered-doctors.component.html',
  styleUrls: ['./add-registered-doctors.component.scss']
})
export class AddRegisteredDoctorsComponent implements OnInit {
  EMAIL_REGEXP =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  register_doctor = { manager_id: '', doctor_id: '', doctor_name: '', site_id: '', email: '', password: '' };
  doctors: any[] = [];
  manager: any = null;
  sites: any[] = [];
  site_value = '';
  ferror = { doctor: false, email: false, valid_email: false };

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {

    let _mgr = sessionStorage.getItem('MGR_USR');
    if (_mgr) {
      this.manager = JSON.parse(_mgr);
      this.register_doctor.manager_id = this.manager.manager_id;

      if (environment.production) {
        const site = this.appService.all_sites.find(x => x.id == this.manager?.site_id);
        if (site) {
          this.site_value = site.name;
        }
      } else {
        this.site_value = 'BP' + this.manager.site_id
      }

      this.register_doctor.site_id = this.site_value;
      this.getDoctors();
    } else {
      this.router.navigate(['/']);
    }

    // this.getSites();
  }

  getDoctors() {
    this.appService.getAllDoctors(this.register_doctor.site_id).subscribe((data) => {
      this.doctors = data;
    });
  }

  getSites() {
    this.appService.getSites().subscribe((data) => {
      this.sites = data;
    });
  }

  onRegister() {
    this.ferror = { doctor: false, email: false, valid_email: false };
    if(!this.register_doctor.doctor_id) {
      this.ferror.doctor = true;
      return;
    }
    if(!this.register_doctor.email) {
      this.ferror.email = true;
      return;
    } else if (!this.EMAIL_REGEXP.test(this.register_doctor.email)) {
      this.ferror.valid_email = true;
      return;
    }
    
    const doc = this.doctors.find(x => x.id == this.register_doctor.doctor_id);
    if (doc) {
      this.register_doctor.doctor_name = doc.doctor_name;
    }
    this.appService.registerDoctor(this.register_doctor).subscribe((resp) => {
      this.router.navigate(['/manager/registered-doctors']);
    }, (err) => alert('failed to register'));
  }
}
