import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Sidekick } from './sidekick';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SidekickService {

  private sidekicksUrl = 'api/sidekicks';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** GET sidekicks from the server */
    getSidekicks(): Observable<Sidekick[]> {
      return this.http.get<Sidekick[]>(this.sidekicksUrl)
        .pipe(
          tap(_ => this.log('fetched sidekicks')),
          catchError(this.handleError<Sidekick[]>('getSidekicks', []))
        );
    }

    /** GET hero by id. Will 404 if id not found */
    getSidekick(id: number): Observable<Sidekick> {
      const url = `${this.sidekicksUrl}/${id}`;
      return this.http.get<Sidekick>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Sidekick>(`getSidekick id=${id}`))
      );
    }

    /* GET heroes whose name contains search term */
    searchSidekicks(term: string): Observable<Sidekick[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Sidekick[]>(`${this.sidekicksUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
          this.log(`found sidekicks matching "${term}"`) :
          this.log(`no sidekicks matching "${term}"`)),
        catchError(this.handleError<Sidekick[]>('searchSidekicks', []))
      );
    }

    /** POST: add a new hero to the server */
    addSidekick(sidekick: Sidekick): Observable<Sidekick> {
      return this.http.post<Sidekick>(this.sidekicksUrl, sidekick, this.httpOptions).pipe(
        tap((newSidekick: Sidekick) => this.log(`added sidekick w/ id=${newSidekick.id}`)),
        catchError(this.handleError<Sidekick>('addSidekick'))
      );
    }

    /** DELETE: delete the hero from the server */
    deleteSidekick(id: number): Observable<Sidekick> {
      const url = `${this.sidekicksUrl}/${id}`;

      return this.http.delete<Sidekick>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted sidekick id=${id}`)),
        catchError(this.handleError<Sidekick>('deleteSidekick'))
      );
    }

    /** PUT: update the hero on the server */
    updateSidekick(sidekick: Sidekick): Observable<any> {
      return this.http.put(this.sidekicksUrl, sidekick, this.httpOptions).pipe(
        tap(_ => this.log(`updated sidekick id=${sidekick.id}`)),
        catchError(this.handleError<any>('updateSidekick'))
      );
    }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SidekickService: ${message}`);
  }
}
