import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RecipientComponent } from './recipient/recipient.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableModule } from 'primeng/table';
@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, RecipientComponent, TransferComponent],
  providers: [],
})
export class ComponentsModule {}
