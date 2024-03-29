import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { TableFilters } from '../models/table-filters.model';

const api = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getExpenses(filters: TableFilters) {
    return this.http.get<any>(api + 'expenseItems', {
      params: {
        _page: filters._page,
        _limit: filters._limit,
      },
    });
  }

  getExpense(id: string): Observable<Expense> {
    return this.http.get<any>(api + `expenseItems/${id}`);
  }

  updateExpense(expense: Partial<Expense>): Observable<Expense> {
    return this.http.put<any>(api + `expenseItems/${expense.id}`, {
      purchasedOn: expense.purchasedOn ?? null,
      nature: expense.nature ?? null,
      comment: expense.comment ?? null,
      originalAmount: expense.originalAmount ?? null,
      convertedAmount: expense.convertedAmount ?? null,
    });
  }

  deleteExpense(id: string): Observable<Expense> {
    return this.http.delete<any>(api + `expenseItems/${id}`);
  }

  createExpense(expense: Partial<Expense>): Observable<Expense> {
    return this.http.post<any>(api + 'expenseItems', {
      purchasedOn: expense.purchasedOn,
      nature: expense.nature,
      comment: expense.comment,
      originalAmount: expense.originalAmount,
      convertedAmount: expense.convertedAmount,
    });
  }

  convertExpense(params: { amount: string | number | undefined; from: string; to: string }) {
    const httpOptions = {
      headers: new HttpHeaders({
        /*      apiKey: apiKey,*/
        'X-RapidAPI-Key': 'ca3f3da909msha9b88fc69c90938p14ae62jsn948a5427f96b',
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
      }),
    };

    return this.http.get<any>(
      `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${params.from}&to=${params.to}&amount=${params.amount}`,
      httpOptions,
    );
  }
}
