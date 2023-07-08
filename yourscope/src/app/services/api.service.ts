import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from '../services/jwt.service';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private hc: HttpClient, private cookie: CookieService, private jwtService : JwtService ) { }

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
          'Response-Type': 'JSON' as const
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
          'Response-Type': 'JSON' as const
        }
        )
      };

      let url : string =  'https://localhost:7184/api/Accounts/v1/';
      url = url.concat(email, '/send-password-reset-email')
      return this.hc.post(url, body, options);
  }

  public getJobs(count: number, offset: number, userID?: number, applied?: boolean) {
    let parameters = {};
    if (userID == undefined && applied == undefined) {
      parameters = {'count': count, 'offset': offset};
    } else if (userID == undefined) {
      parameters = {'applied': applied, 'count': count, 'offset': offset};
    } else {
      parameters = {'userId': userID, 'count': count, 'offset': offset};
    }
    const options = {
      params: parameters,
      headers: new HttpHeaders({
        'Api-Key': environment.firebase.apiKey,
        'Authorization': this.cookie.get("loginToken"),
        'Accept': 'application/json' as const, 
        'Content-Type': 'application/json' as const, 
        'Response-Type': 'JSON' as const
      })
    };
    return this.hc.get('https://localhost:7184/api/job/v1/posting', options);
  }

  public getEvents(offSet: number, count : number, schoolId? : number, userID? : number){
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);

    if(userID != undefined){
      const options = {
        params: {'offset': offSet, 'userId': decodedToken.userID, 'count': count},
        headers: new HttpHeaders(
        {
          'Api-Key': environment.firebase.apiKey,
          'Authorization': loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        }
        )
      };
      
      return this.hc.get('https://localhost:7184/api/events/v1', options);
    } else if (schoolId != undefined) {
      const options = {
        params: {'offset': offSet, 'count': count, 'schoolId': decodedToken.affiliationID},
        headers: new HttpHeaders(
        {
          'Api-Key': environment.firebase.apiKey,
          'Authorization': loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        }
        )
      };

      return this.hc.get('https://localhost:7184/api/events/v1', options);
    } else {
      const options = {
        params: {'offset': offSet, 'count': count},
        headers: new HttpHeaders(
        {
          'Api-Key': environment.firebase.apiKey,
          'Authorization': loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        }
        )
      };
      
      return this.hc.get('https://localhost:7184/api/events/v1', options);
    }
  }

  public getEventCount(schoolId? : number, userID? : number){
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);

    if (userID != undefined && schoolId != undefined) {
      const options = {
        params: {'userId': decodedToken.userID, 'schoolId': decodedToken.affiliationID},
        headers: new HttpHeaders(
        {
          'Api-Key': environment.firebase.apiKey,
          'Authorization': loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        }
        )
      };
      
      return this.hc.get('https://localhost:7184/api/events/v1/count', options);
    } else if (schoolId != undefined) {
      const options = {
        params: {'userId': decodedToken.affiliationID},
        headers: new HttpHeaders(
        {
          'Api-Key': environment.firebase.apiKey,
          'Authorization': loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        }
        )
      };

      return this.hc.get('https://localhost:7184/api/events/v1/count', options);
    } else {
      const options = {
        params: {'schoolId': decodedToken.affiliationID},
        headers: new HttpHeaders(
        {
          'Api-Key': environment.firebase.apiKey,
          'Authorization': loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        }
        )
      };
      
      return this.hc.get('https://localhost:7184/api/events/v1/count', options);
    }
  }


  public createEvent(title : string, description : string, eventDate : Date, location : string){
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
    console.log(decodedToken);
    const body = JSON.stringify({"title":title, "description":description, "date": eventDate, "location": location, "userId":decodedToken.userID})
    const options = {
        headers: new HttpHeaders(
        {
          "Api-Key": environment.firebase.apiKey,
          "Authorization": loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        }
        )
      };
     
    return this.hc.post('https://localhost:7184/api/events/v1', body, options);
  }

  public deleteEvent(id : number){
    let loginToken = this.cookie.get("loginToken");
    const options = {
        headers: new HttpHeaders(
        {
          "Api-Key": environment.firebase.apiKey,
          "Authorization": loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        }
        )
      };
     
    return this.hc.delete('https://localhost:7184/api/events/v1/'+id, options);
  }


}
