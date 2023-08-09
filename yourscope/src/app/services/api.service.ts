import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from '../services/jwt.service';
import { CookieService } from 'ngx-cookie-service'
import { firstValueFrom, lastValueFrom } from 'rxjs';
import settings from '../../appsettings.json';

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

    return this.hc.post(settings.apiBaseURL+'api/Accounts/v1/login', body, options);
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

      let url : string =  settings.apiBaseURL+'api/Accounts/v1/';
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
    return this.hc.get(settings.apiBaseURL+'api/job/v1/posting', options);
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

      return this.hc.get(settings.apiBaseURL+'api/events/v1', options);
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

      return this.hc.get(settings.apiBaseURL+'api/events/v1', options);
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

      return this.hc.get(settings.apiBaseURL+'api/events/v1', options);
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

    return this.hc.get(settings.apiBaseURL+'api/schools/v1/courses', options);
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

    return this.hc.get(settings.apiBaseURL+'api/schools/v1/courses/count', options);
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

    let res = await firstValueFrom(this.hc.get(settings.apiBaseURL+'api/accounts/v1/'+id, options));

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

      return this.hc.get(settings.apiBaseURL+'api/events/v1/count', options);
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

      return this.hc.get(settings.apiBaseURL+'api/events/v1/count', options);
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

      return this.hc.get(settings.apiBaseURL+'api/events/v1/count', options);
    }
  }


  public createEvent(title : string, description : string, eventDate : Date, location : string){
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
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

    return this.hc.post(settings.apiBaseURL+'api/events/v1', body, options);
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

    return this.hc.delete(settings.apiBaseURL+'api/events/v1/'+id, options);
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

    return this.hc.get(settings.apiBaseURL+'api/job/v1/posting', options);
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

    return this.hc.post(settings.apiBaseURL+'api/job/v1/posting', body, options);
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

    return this.hc.delete(settings.apiBaseURL+'api/job/v1/posting/'+id, options);
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

    return this.hc.get(settings.apiBaseURL+'api/job/v1/application/' + postingID, options);
  }

  public async getStudentSchedule(userID: number) {
    const url = settings.apiBaseURL+'api/student/v1/schedule/'+userID;

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
    const url = settings.apiBaseURL+"api/student/v1/schedule/" + userID;

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

    return response.data;
  }

  public addCourseToSchedule( year: number, courseID: number) {
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

    return this.hc.post(settings.apiBaseURL+'api/student/v1/schedule/'+decodedToken.userID+'/year/'+year+'/course/'+courseID, options);
  }

  public async deleteCourseFromSchedule(userID: number, year: number, courseID: number) {
    const url = `${settings.apiBaseURL}api/student/v1/schedule/${userID}/year/${year}/course/${courseID}`;

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

    return this.hc.post(settings.apiBaseURL+'api/schools/v1/'+ decodedToken.affiliationID + '/courses', body, options);
  }

  public getRecommendedCourses(userID: number, schoolID: number) {
    let loginToken = this.cookie.get("loginToken");
    let parameters: any = {};
    if (schoolID != undefined) {
      parameters.schoolID = schoolID;
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

    return this.hc.get(settings.apiBaseURL+'api/student/v1/insight/courses/'+ userID + "/", options);
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
    return this.hc.get(settings.apiBaseURL+'api/profile/v1/profile', options);
  }

  public createProfile(skills?: string | null, intrestsHobbies?:string | null, awards?:string | null){
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
    return this.hc.post(settings.apiBaseURL+'api/profile/v1/profile', body, options);
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

    return this.hc.delete(settings.apiBaseURL+'api/schools/v1/'+ decodedToken.affiliationID + '/courses/'+id, options);
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

      return this.hc.get(settings.apiBaseURL+'api/job/v1/posting/count', options);
  }

  public async getCoverLetters() {
    // Getting user information.
    let loginToken = this.cookie.get('loginToken');
    if (loginToken.length == 0) throw new Error("The user is not logged in.");
    let decodedToken = this.jwtService.DecodeToken(loginToken);

    // API header setup.
    const url = settings.apiBaseURL+'api/profile/v1/cover-letter';
    const options = {
      params: {'userId': decodedToken.userID },
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const,
        'Content-Type': 'application/json' as const,
        'Response-Type': 'JSON' as const
      })
    };

    let res = await lastValueFrom(this.hc.get(url, options));

    let response = JSON.parse(JSON.stringify(res));
    if (response.statusCode != 200) {
      console.log(response);
      throw new Error("Unsuccesful call to GET cover letter endpoint from API.");
    }

    return response.data;
  }

  public async deleteCoverLetter(id: number) {
    // Getting user information.
    let loginToken = this.cookie.get('loginToken');
    if (loginToken.length == 0) throw new Error("The user is not logged in.");
    let decodedToken = this.jwtService.DecodeToken(loginToken);

    // API header setup.
    const url = settings.apiBaseURL+'api/profile/v1/cover-letter';
    const options = {
      params: {'coverLetterId': id },
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const,
        'Content-Type': 'application/json' as const,
        'Response-Type': 'JSON' as const
      })
    };

    let res = await lastValueFrom(this.hc.delete(url, options));

    let response = JSON.parse(JSON.stringify(res));
    if (response.statusCode != 200) {
      console.log(response);
      throw new Error("Unsuccesful call to DELETE cover letter endpoint from API.");
    }

    return response.data;
  }

  public async getUniversityList() {
    // Getting user information.
    let loginToken = this.cookie.get('loginToken');
    if (loginToken.length == 0) throw new Error("The user is not logged in.");

    // API header setup.
    const url = settings.apiBaseURL+'api/university/v1/schools';
    const options = {
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const,
        'Content-Type': 'application/json' as const,
        'Response-Type': 'JSON' as const
      })
    };

    let res = await lastValueFrom(this.hc.get(url, options));

    let response = JSON.parse(JSON.stringify(res));
    if (response.statusCode != 200) {
      console.log(response);
      throw new Error("Unsuccesful call to GET univeristy endpoint from API.");
    }

    return response.data;
  }

  public async getProgramWithFilters(searchQuery: string, university: number | undefined, count: number, offset: number) {
    // Getting user information.
    let loginToken = this.cookie.get('loginToken');
    if (loginToken.length == 0) throw new Error("The user is not logged in.");

    // API header setup.
    const url = `${settings.apiBaseURL}api/university/v1/programs?count=${count}&offset=${offset}&Search=${searchQuery}${(university !== undefined ? `&UniversityId=${university}` : '')}`;
    const options = {
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const,
        'Content-Type': 'application/json' as const,
        'Response-Type': 'JSON' as const
      })
    };

    let res = await lastValueFrom(this.hc.get(url, options));

    let response = JSON.parse(JSON.stringify(res));
    if (response.statusCode != 200) {
      console.log(response);
      throw new Error("Unsuccesful call to GET university programs endpoint from API.");
    }

    return response.data;
  }

  public async countProgramWithFilters(searchQuery: string, university: number | undefined) {
    // Getting user information.
    let loginToken = this.cookie.get('loginToken');
    if (loginToken.length == 0) throw new Error("The user is not logged in.");

    // API header setup.
    const url = `${settings.apiBaseURL}api/university/v1/programs/count?Search=${searchQuery}${(university !== undefined ? `&UniversityId=${university}` : '')}`;
    const options = {
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const,
        'Content-Type': 'application/json' as const,
        'Response-Type': 'JSON' as const
      })
    };

    let res = await lastValueFrom(this.hc.get(url, options));

    let response = JSON.parse(JSON.stringify(res));
    if (response.statusCode != 200) {
      console.log(response);
      throw new Error("Unsuccesful call to GET university programs count endpoint from API.");
    }

    return response.data;
  }

  public async createCoverLetter(intro: string, pitch1: string, pitch2: string, pitch3: string, conclusion: string) {
    // Getting user information.
    let loginToken = this.cookie.get('loginToken');
    if (loginToken.length == 0) throw new Error("The user is not logged in.");
    let decodedToken = this.jwtService.DecodeToken(loginToken);

    // API header and body setup.
    const url = settings.apiBaseURL + 'api/profile/v1/cover-letter?userId=' + decodedToken.userID;
    const options = {
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const,
        'Content-Type': 'application/json' as const,
        'Response-Type': 'JSON' as const
      })
    };
    let body = {
      intro: intro,
      salesPitch1: pitch1,
      salesPitch2: pitch2,
      salesPitch3: pitch3,
      conclusion: conclusion
    }

    // Calling the API
    let res = await lastValueFrom(this.hc.post(url, body, options));

    let response = JSON.parse(JSON.stringify(res));
    if (response.statusCode != 200 && response.statusCode != 201) {
      console.log(response);
      throw new Error("Unsuccessful call to POST cover letter endpoint from API.");
    }

    return response.data;
  }
}
