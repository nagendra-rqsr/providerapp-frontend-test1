import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '', site_id: '' };
  sites: any[] = [];
  error = '';

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.getSites();
  }

  getSites() {
    this.appService.getSites().subscribe(data => {
      this.sites = data;
      this.appService.all_sites = this.sites;
    }, (err) => {
      
    });
  }

  onLogin() {
    this.error = '';
    this.appService.login(this.user).subscribe((resp) => {
      sessionStorage.setItem('MGR_USR', JSON.stringify(resp));
      this.router.navigate(['/manager']);
    }, (err) => {
      this.error = err.error;
    });
  }

}
