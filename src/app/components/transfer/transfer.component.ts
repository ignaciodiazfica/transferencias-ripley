import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecipientService } from 'src/app/services/recipient.service';
import { take } from 'rxjs/operators';
import { BankService } from 'src/app/services/bank.service';
import { forkJoin } from 'rxjs';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  public transferForm: any;
  public selectedRecipient;
  public recipients: any[] = [];
  public banks: any[] = [];
  constructor(
    private fb: FormBuilder,
    private recipientService: RecipientService,
    private bankService: BankService,
    private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getDataDefault();
  }
  initForm() {
    this.transferForm = this.fb.group({
      recipient: [null, Validators.required],
      amount: ['', Validators.required],
    });
  }
  getDataDefault() {
    let petitions = forkJoin([
      this.recipientService.getRecipients(),
      this.bankService.getBanks(),
    ]);
    petitions.pipe(take(1)).subscribe((res) => {
      this.recipients = res[0];
      this.banks = res[1];
    });
  }

  sendTransfer() {
    let transferencia = this.transferForm.value;
    const objectToTransfer = {
      recipientId: transferencia.recipient.id,
      amount: transferencia.amount,
    };
    this.transferService
      .postTransfer(objectToTransfer)
      .pipe(take(1))
      .subscribe(
        (res) => {
          console.log(res);
          this.transferForm.reset();
        },
        (err) => {
          console.error(err);
        }
      );
  }
  handleOnChangeRecipient(event) {
    this.selectedRecipient = event.value;
    this.selectedRecipient.bank = this.banks.filter(
      (item) => item.id === this.selectedRecipient.bank
    )[0].name;
  }

  get recipient() {
    return this.transferForm.get('recipient');
  }
}
