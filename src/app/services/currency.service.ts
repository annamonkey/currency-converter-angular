import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/UAH';

  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<{ [key: string]: number }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => ({
        UAH: 1,
        USD: response.rates.USD,
        EUR: response.rates.EUR
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Виникла помилка при отриманні курсів валют. Спробуйте пізніше.';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Помилка: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Код помилки: ${error.status}, повідомлення: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
