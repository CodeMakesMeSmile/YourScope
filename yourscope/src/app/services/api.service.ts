import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from '../services/jwt.service';
import { CookieService } from 'ngx-cookie-service'
import { firstValueFrom, lastValueFrom } from 'rxjs';


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
    } else if (applied == undefined) {
      parameters = {'userId': userID, 'count': count, 'offset': offset};
    } else {
      parameters = {'userId': userID, 'applied': applied, 'count': count, 'offset': offset};
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

  public getEvents(count: number, offset: number, schoolId? : number, userID? : number){
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);

    if(userID != undefined){
      const options = {
        params: {'offset': offset, 'userId': decodedToken.userID, 'count': count},
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
        params: {'offset': offset, 'count': count, 'schoolId': decodedToken.affiliationID},
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
        params: {'offset': offset, 'count': count},
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

  public getCourses(schoolID?: number, searchQuery?: string, grade?: number, disciplines?: string, offset?: number, count?: number) {
    let loginToken = this.cookie.get("loginToken");
    let parameters: any = {};
    if (schoolID != undefined) {
      parameters.schoolID = schoolID;
    }
    if (searchQuery != undefined) {
      parameters.searchQuery = searchQuery;
    }
    if (grade != undefined) {
      parameters.grade = grade;
    }
    if (disciplines != undefined) {
      parameters.disciplines = disciplines;
    }
    if (offset != undefined) {
      parameters.offset = offset;
    }
    if (count != undefined) {
      parameters.count = count;
    }
    const options = {
      params: parameters,
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

    return this.hc.get('https://localhost:7184/api/schools/v1/courses', options);
  }

  public getCourseCount(schoolID?: number, searchQuery?: string, grade?: number, disciplines?: string) {
    let loginToken = this.cookie.get("loginToken");
    let parameters: any = {};
    if (schoolID != undefined) {
      parameters.schoolID = schoolID;
    }
    if (searchQuery != undefined) {
      parameters.searchQuery = searchQuery;
    }
    if (grade != undefined) {
      parameters.grade = grade;
    }
    if (disciplines != undefined) {
      parameters.disciplines = disciplines;
    }
    const options = {
      params: parameters,
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

    return this.hc.get('https://localhost:7184/api/schools/v1/courses/count', options);
  }

  public async getUser(id: number) {
    let loginToken = this.cookie.get("loginToken");

    const options = {
      headers: new HttpHeaders (
        {
          "Api-Key": environment.firebase.apiKey,
          "Authorization": loginToken,
          'Accept': 'application/json' as const,
          'Content-Type': 'application/json' as const,
          'Response-Type': 'JSON' as const
        }
      )
    };

    let res = await firstValueFrom(this.hc.get('https://localhost:7184/api/accounts/v1/'+id, options));

    return JSON.parse(JSON.stringify(res)).data;
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

  public getJobPostings(offset: number, count : number, userID? : number, applied? : boolean, employerId?: number) {
    let loginToken = this.cookie.get("loginToken");
    
    let parameters = {};
    if (userID == undefined && applied == undefined) {
      parameters = {'count': count, 'offset': offset};
    } else if (userID == undefined) {
      parameters = {'applied': applied, 'count': count, 'offset': offset};
    } else {
      parameters = {'userId': userID, 'count': count, 'offset': offset};
    }
    if (employerId != undefined) {
      parameters = {...parameters, employerId: employerId};
    }

    const options =
    {
      params: parameters,
      headers: new HttpHeaders(
      {
        'Api-Key': environment.firebase.apiKey,
        'Authorization': loginToken,
        'Accept': 'application/json' as const, 
        'Content-Type': 'application/json' as const, 
        'Response-Type': 'JSON' as const
      })
    }
    
    return this.hc.get('https://localhost:7184/api/job/v1/posting', options);
  }

  public createJobPosting(title : string, description : string, applicationDeadline : Date){
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
    const body = JSON.stringify({"title":title, "description":description, "applicationDeadline": applicationDeadline, "userId":decodedToken.userID})
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
    
    return this.hc.post('https://localhost:7184/api/job/v1/posting', body, options);
  }

  public deleteJobPosting(id : number){
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
    
    return this.hc.delete('https://localhost:7184/api/job/v1/posting/'+id, options);
  }

  public getJobApplicants(postingID: number) {
    let loginToken = this.cookie.get("loginToken");
    
    let parameters = {};

    const options =
    {
      params: parameters,
      headers: new HttpHeaders(
      {
        'Api-Key': environment.firebase.apiKey,
        'Authorization': loginToken,
        'Accept': 'application/json' as const, 
        'Content-Type': 'application/json' as const, 
        'Response-Type': 'JSON' as const
      })
    }
    
    return this.hc.get('https://localhost:7184/api/job/v1/application/' + postingID, options);
  }

  public async getStudentSchedule(userID: number) {
    const url = 'https://localhost:7184/api/student/v1/schedule/'+userID;

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

    let res;
    try {
      res = await lastValueFrom(this.hc.get(url, options));
    }
    catch(err: any) {
      console.log(err);
      return undefined;
    }

    let response = JSON.parse(JSON.stringify(res));
    return response.data;
  }

  public async createStudentSchedule(userID: number) {
    const url = "https://localhost:7184/api/student/v1/schedule/" + userID;

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

    let res = await firstValueFrom(this.hc.post(url, options));

    let response = JSON.parse(JSON.stringify(res));
    if (!(response.statusCode == 201))
      console.log(response);

    return response.data;
  }

  public async deleteCourseFromSchedule(userID: number, year: number, courseID: number) {
    const url = `https://localhost:7184/api/student/v1/schedule/${userID}/year/${year}/course/${courseID}`;

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

    let res = await firstValueFrom(this.hc.delete(url, options));

    let response = JSON.parse(JSON.stringify(res));

    return response;
  }

  public createCourse(code: string, name: string, discipline: string, type: string, grade: number, credits: number, description: string, prerequisites: string){
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
    const body = JSON.stringify([{"courseCode":code, "name":name, "description":description, "discipline":discipline, "type": type, "grade": grade, "credits":credits, "prerequisites":prerequisites}])
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

    return this.hc.post('https://localhost:7184/api/schools/v1/'+ decodedToken.affiliationID + '/courses', body, options);
  }

  public getProfile(userID : number){
    let loginToken = this.cookie.get("loginToken");
    const options = {
        params: {'userId': userID},
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
    return this.hc.get('https://localhost:7184/api/profile/v1/profile', options);
  }

  public createProfile(skills?: string | null, intrestsHobbies?:string | null, awards?:string | null){
    console.log(skills + " " + intrestsHobbies + " " + awards);
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
    const body = JSON.stringify({"userId":decodedToken.userID, "skills":skills, "intrestsHobbies": intrestsHobbies, "awards": awards})
    const options = {
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
    return this.hc.post('https://localhost:7184/api/profile/v1/profile', body, options);
  }

  public deleteCourse(id : number){
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
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

    return this.hc.delete('https://localhost:7184/api/schools/v1/'+ decodedToken.affiliationID + '/courses/'+id, options);
  }
    
  public jobCount() {
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
    const options =
      {
        params: {'employerId': decodedToken.userID},
        headers: new HttpHeaders(
        {
          'Api-Key': environment.firebase.apiKey,
          'Authorization': loginToken,
          'Accept': 'application/json' as const, 
          'Content-Type': 'application/json' as const, 
          'Response-Type': 'JSON' as const
        })
      };
      
      return this.hc.get('https://localhost:7184/api/job/v1/posting/count', options);
  }
}
