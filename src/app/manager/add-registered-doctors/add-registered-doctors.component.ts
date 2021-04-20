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
  register_doctor = { manager_id: '', doctor_id: '', doctor_name: '', site_id: '', email: '', password: '' };
  doctors: any[] = [];
  manager: any = null;
  sites: any[] = [];
  site_prefix = '';

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.site_prefix = environment.production ? '' : 'BP';
    let _mgr = sessionStorage.getItem('MGR_USR');
    if (_mgr) {
      this.manager = JSON.parse(_mgr);
      this.register_doctor.manager_id = this.manager.manager_id;
      this.register_doctor.site_id = this.site_prefix + this.manager.site_id;
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
    const doc = this.doctors.find(x => x.id == this.register_doctor.doctor_id);
    if (doc) {
      this.register_doctor.doctor_name = doc.doctor_name;
    }
    this.appService.registerDoctor(this.register_doctor).subscribe((resp) => {
      this.router.navigate(['/manager/registered-doctors']);
    }, (err) => alert('failed to register'));
  }
}
