import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  getTransfers(){
    return this.http.get<any>('/api/transfers')
  }

  getTransferById(transferId: string){
    return this.http.get<any>(`/api/transfers/${transferId}`)
  }

  postTransfer(transfer: any){
    return this.http.post<any>('/api/transfers', transfer)
  }
}
