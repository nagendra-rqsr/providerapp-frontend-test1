import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    baseUrl = environment.appUrl;

    constructor(private http: HttpClient) {

    }

    login(user: any): Observable<any> {
        const url = this.baseUrl + 'accounts/login'
        return this.http.post<any>(url, user);
    }

    getAllDoctors(siteId:any): Observable<any> {
        const url = this.baseUrl + 'accounts/doctors/?site_id=' + siteId;
        return this.http.get<any>(url);
    }

    getSites(): Observable<any> {
        const url = 'http://52.64.1.72/site/';
        return this.http.get<any>(url);
    }

    getAllSites(): Observable<any> {
        const url = this.baseUrl + 'accounts/sites/'
        return this.http.get<any>(url);
    }

    getRegisteredDoctors(manager_id: any): Observable<any> {
        const url = this.baseUrl + 'accounts/register-doctor/'
        return this.http.get<any>(url);
    }

    registerDoctor(doctor: any): Observable<any> {
        const url = this.baseUrl + 'accounts/register-doctor/'
        return this.http.post(url, doctor);
    }
}