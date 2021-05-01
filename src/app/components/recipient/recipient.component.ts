import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { BankService } from 'src/app/services/bank.service';
import { RecipientService } from 'src/app/services/recipient.service';
@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css'],
})
export class RecipientComponent implements OnInit {
  recipients: any[] = [];
  banks: any[] = [];
  constructor(
    private recipientService: RecipientService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.getDataDefault();
  }

  getDataDefault() {
    let petitions = forkJoin([
      this.recipientService.getRecipients(),
      this.bankService.getBanks(),
    ]);
    petitions.pipe(take(1)).subscribe(
      (res) => {
        this.recipients = res[0];
        this.banks = res[1];
        this.recipients.forEach(item => {
          item.bank = this.banks.filter(b => b.id === item.bank)[0].name;
        })
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
