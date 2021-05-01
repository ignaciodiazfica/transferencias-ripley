import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TypeAccountService {
  constructor(private http: HttpClient) {}

  getTypeAccounts() {
    return this.http.get<any>('/api/type-accounts');
  }

  postTypeAccount(typeAccount: any) {
    return this.http.post<any>('/api/type-accounts', typeAccount);
  }

  putTypeAccount(typeAccountId: string, typeAccount: any) {
    return this.http.put<any>(
      `/api/type-accounts/${typeAccountId}`,
      typeAccount
    );
  }

  deleteTypeAccount(typeAccountId: string) {
    return this.http.delete<any>(`/api/type-accounts/${typeAccountId}`);
  }
}
