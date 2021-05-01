import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { AuthService } from './services/auth.service';
import { BankService } from './services/bank.service';
import { TransferService } from './services/transfer.service';
import { RecipientService } from './services/recipient.service';
import { TypeAccountService } from './services/type-account.service';
import { UserService } from './services/user.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [
    Title,
    AuthService,
    BankService,
    RecipientService,
    TransferService,
    TypeAccountService,
    MessageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
