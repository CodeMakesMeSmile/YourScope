import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private hc: HttpClient) { }

  public get(url: string, options?: any) {
    return this.hc.get(url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.hc.post(url, data, options);
  }

  public getLogin(email : string, password : string){
    const body = JSON.stringify({"email":email, "password":password})
    const options = {
        headers: new HttpHeaders(
        {
          "Api-Key": environment.firebase.apiKey,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'text' as const
        }
        )
      };
     
    return this.hc.post('https://localhost:7184/api/Accounts/v1/login', body, options);
  }
  
  public passwordReset(email : string){
    const body = JSON.stringify({"email":email})
    const options = {
        headers: new HttpHeaders(
        {
          "Api-Key": environment.firebase.apiKey,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'text' as const
        }
        )
      };

      let url : string =  'https://localhost:7184/api/Accounts/v1/';
      url = url.concat(email, '/send-password-reset-email')
      return this.hc.post(url, body, options);
  }
}
