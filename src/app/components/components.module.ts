import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import {DividerModule} from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RecipientComponent } from './recipient/recipient.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableModule } from 'primeng/table';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    DropdownModule,
    CommonModule,
    InputNumberModule,
    InputMaskModule,
    ToastModule,
    DividerModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    ToastModule,
    DividerModule
  ],
  declarations: [
    LoginComponent,
    RecipientComponent,
    TransferComponent,
    PageNotFoundComponent,
    HistoryComponent,
    HomeComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
