import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { TransferComponent } from './components/transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Prueba Técnica de Ripley - Iniciar Sesión',
    }
  },
  {
    path: 'recipient',
    component: RecipientComponent,
    data: {
      title: 'Nuevo Destinatario',
    }
  },
  {
    path: 'transfer',
    component: TransferComponent,
    data: {
      title: 'Transferencias',
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
