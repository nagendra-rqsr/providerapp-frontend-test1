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

  constructor(
    private appService: AppService,
    private router: Router
    ) { }

  ngOnInit(): void {
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

}
