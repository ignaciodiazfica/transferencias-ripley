import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { BankService } from 'src/app/services/bank.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { TypeAccountService } from 'src/app/services/type-account.service';
@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css'],
})
export class RecipientComponent implements OnInit {
  public recipientForm: any;
  recipients: any[] = [];
  showNewRecipient = false;
  banks: any[] = [];
  typeAccounts: any[] = [];
  rutMask;
  constructor(
    private recipientService: RecipientService,
    private bankService: BankService,
    private typeAccountService: TypeAccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDataDefault();
    this.initForm();
  }

  initForm() {
    this.recipientForm = this.fb.group({
      rut: ['', [Validators.required, Validators.maxLength(12)]],
      name: ['', Validators.required],
      email: ['', Validators.email],
      bank: [null, Validators.required],
      phone: ['', Validators.required],
      typeAccount: [null, Validators.required],
      accountNumber: ['', Validators.required],
    });
  }

  getDataDefault() {
    let petitions = forkJoin([
      this.recipientService.getRecipients(),
      this.bankService.getBanks(),
      this.typeAccountService.getTypeAccounts(),
    ]);
    petitions.pipe(take(1)).subscribe(
      (res) => {
        this.recipients = res[0];
        this.banks = res[1];
        this.typeAccounts = res[2];
        this.recipients.forEach((item) => {
          item.bank = this.banks.filter((b) => b.id === item.bank)[0].name;
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }
  handleNewRecipient() {
    this.showNewRecipient = true;
  }

  saveRecipient() {
    let destinatario = this.recipientForm.value;
    const objectToSave = {
      rut: destinatario.rut,
      name: destinatario.name,
      email: destinatario.email,
      phone: destinatario.phone,
      bank: destinatario.bank.id,
      typeAccount: destinatario.typeAccount.id,
      accountNumber: destinatario.accountNumber,
    };
    this.recipientService
      .postRecipient(objectToSave)
      .pipe(take(1))
      .subscribe(
        () => {
          this.showNewRecipient = false;
          this.getDataDefault();
        },
        (err) => {
          console.error(err);
        }
      );
  }

  onHide(){
    this.showNewRecipient = false;
  }

  handleCheckRut(event) {
    let rut = event.target.value;
    if (rut.length === 8) {
      rut = rut.replace(
        /^(\d{1})(\d{1,3})(\d{1,3})([\dkW{1}])$/,
        '$1.$2.$3-$4'
      );
    } else {
      rut = rut.replace(
        /^(\d{1,2})(\d{1,3})(\d{1,3})([\w{1}])$/,
        '$1.$2.$3-$4'
      );
    }
    event.target.value = rut;
  }

  handleRutNoCharacters(event) {
    let rut = event.target.value;
    rut = rut.replace(/[^0-9]/g, '');
    event.target.value = rut;
  }
  handleMaskRut(event) {
    let rut = event.target.value;
    let primerosDigitos = rut.split('.')[0]
    console.log(primerosDigitos)
    if (primerosDigitos < 10) {
      this.rutMask = '9.999.999-*';
    }
    event.target.value = rut;
  }
  get rut() {
    return this.recipientForm.get('rut');
  }
}
