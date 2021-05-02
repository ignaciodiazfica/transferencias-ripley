import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { TransferComponent } from './components/transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Prueba Técnica de Ripley - Inicio',
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    data: {
      title: 'Prueba Técnica de Ripley - Iniciar Sesión',
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Prueba Técnica de Ripley - Inicio',
    }
  },
  {
    path: 'recipient',
    component: RecipientComponent,
    data: {
      title: 'Prueba Técnica de Ripley - Destinatarios',
    }
  },
  {
    path: 'transfer',
    component: TransferComponent,
    data: {
      title: 'Prueba Técnica de Ripley - Transferencias',
    }
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {
      title: 'Historial de Transferencias',
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Pagina no encontrada :('
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
