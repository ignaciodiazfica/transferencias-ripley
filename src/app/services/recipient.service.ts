import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipientService {
  constructor(private http: HttpClient) {}

  getRecipients() {
    return this.http.get<any>('/api/recipients');
  }
  getRecipientById(recipientId: string) {
    return this.http.get<any>(`/api/recipients/${recipientId}`);
  }

  postRecipient(recipient: any) {
    return this.http.post<any>('/api/recipients', recipient);
  }

  putRecipient(recipientId: string, recipient: any) {
    return this.http.put<any>(`/api/recipients/${recipientId}`, recipient);
  }

  removeRecipient(recipientId: string) {
    return this.http.delete<any>(`/api/recipients/${recipientId}`);
  }
}
