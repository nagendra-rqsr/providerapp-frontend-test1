import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-registered-doctors',
  templateUrl: './registered-doctors.component.html',
  styleUrls: ['./registered-doctors.component.scss']
})
export class RegisteredDoctorsComponent implements OnInit {
  registered_doctors: any[] = [];
  isActiveDirty = false;

  constructor(
    private appService: AppService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let _mgr = sessionStorage.getItem('MGR_USR');
    if(!_mgr) {
      this.router.navigate(['/']);
    }
    this.getResiteredDoctors();
  }

  getResiteredDoctors() {
    this.appService.getRegisteredDoctors(1).subscribe((data) => {
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
