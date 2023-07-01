import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl: string = "http://localhost:3000/usuario";

  constructor(private http: HttpClient) { }

  createUser(usuario : any): Observable<any>{
    return this.http.post(this.baseUrl + "/crear", usuario);
  }

  verifyCode(data : any): Observable<any>{
    return this.http.post(this.baseUrl + "/verificar", data);
  }

  authenticateUser(data : any): Observable<any>{
    return this.http.post(this.baseUrl + "/autentificar", data);
  }

}