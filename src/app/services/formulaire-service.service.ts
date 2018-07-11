import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Client} from '../metier/client';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  private serverURL = '/apiClient';

  constructor(private http: HttpClient) { }

    //////// Save methods //////////

  /** POST: ajoute un nouveau clien au serveur */
  addClient (client: Client): Observable<Client> {
    return this.http.post<Client>(this.serverURL, client, httpOptions).pipe(
      tap((client: Client) => console.log('added client'))
    );
  }

  postForm() : void{

  }

}
