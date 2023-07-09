import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiGithubService {

  api_data: any;
//   public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json'})};
  public api_url = environment.Github_api_url;

  constructor(
    private http: HttpClient
    ) { }

//   postInsertVehicle(api_consult:string, type: string, license_plate: string, brand_id: string, user_id: string) {
//     this.api_data = {
//       "type":type,
//       "license_plate":license_plate,
//       "brand_id":brand_id,
//       "user_id":user_id
//     };
//     const datos = JSON.stringify(this.api_data);
//     return this.http.post(this.api_url + api_consult, datos, this.httpOptions);
//   }

  public getUsersForUsername(api_consult:string, username:string) {
    return this.http.get<any>(this.api_url+api_consult+username).pipe(map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
