import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { BankService } from 'src/app/services/bank.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  public emptyTable = false;
  public historyTable: any[] = [];
  public historial: any[] = [];
  public banks: any[] = [];
  constructor(
    private transferService: TransferService,
    private bankService: BankService
  ) {}

  ngOnInit() {
    this.getDataDefault();
  }

  getDataDefault() {
    let petitions = forkJoin([
      this.transferService.getTransfers(),
      this.bankService.getBanks(),
    ]);

    petitions.pipe(take(1)).subscribe(
      (res) => {
        this.historial = res[0];
        this.banks = res[1];
        this.historial.forEach((item) => {
          item.recipient.forEach((rec) => {
            this.historyTable.push({
              bank: this.banks.filter((b) => b.id === rec.bank)[0].name,
              name: rec.name,
              rut: rec.rut,
              typeAccount: rec.typeAccount[0].name,
              amount: item.amount,
            });
          });
        });
        if (this.historial.length === 0) {
          this.emptyTable = true;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
