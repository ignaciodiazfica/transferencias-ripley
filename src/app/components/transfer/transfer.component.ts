import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecipientService } from 'src/app/services/recipient.service';
import { take } from 'rxjs/operators';
import { BankService } from 'src/app/services/bank.service';
import { forkJoin } from 'rxjs';
import { TransferService } from 'src/app/services/transfer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  public transferForm: any;
  public selectedRecipient;
  public recipientsEmpty = false;
  public recipients: any[] = [];
  public banks: any[] = [];
  constructor(
    private fb: FormBuilder,
    private recipientService: RecipientService,
    private bankService: BankService,
    private transferService: TransferService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getDataDefault();
  }
  initForm() {
    this.transferForm = this.fb.group({
      recipient: [
        { value: null, disabled: this.recipientsEmpty },
        Validators.required,
      ],
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
      if (this.recipients.length === 0) {
        this.recipientsEmpty = true;
      }
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
          this.transferForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Transferencia realizada!',
            detail: 'Su transferencia ha sido realizada correctamente',
          });
        },
        (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error al realizar la transferencia',
            detail: 'La transferencia no ha sido realizada, intente nuevamente',
          });
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
