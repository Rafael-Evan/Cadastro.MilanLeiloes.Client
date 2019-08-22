import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Documentos } from '../_models/Documentos';

@Injectable({
  providedIn: 'root'
})
export class MilanDocumentosService {

  baseUrl = 'https://localhost:44378/api/user/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;


constructor(private http: HttpClient) { }

documentos(documentos: Array<Documentos>) {
  // const headers = new HttpHeaders({
  //   'Content-Type': 'application/json'
  // });
  // const options = {
  //   headers: headers
  // };
  return this.http
    .post(`${this.baseUrl}documentos`, documentos);
}

}
