import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RecipientComponent } from './recipient/recipient.component';
import { TransferComponent } from './transfer/transfer.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [InputTextModule, ButtonModule, PasswordModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [InputTextModule, ButtonModule, PasswordModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [LoginComponent, RecipientComponent, TransferComponent],
  providers: [

  ]
})
export class ComponentsModule {}
