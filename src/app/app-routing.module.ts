import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './routes/authentication/authentication.component';
import { IndexComponent } from './routes/dashboard/index/index.component';
import { AuthGuard } from './guards/authGuard/auth.guard';
import { AuthGuardLoginGuard } from './guards/authGuardLogin/auth-guard-login.guard';
import { InvestmentsComponent } from './routes/dashboard/investments/investments.component';
import { ReturnsComponent } from './routes/dashboard/returns/returns.component';
import { OrdersComponent } from './routes/dashboard/orders/orders.component';
import { SettingsComponent } from './routes/dashboard/settings/settings.component';

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardLoginGuard],
  },
  {
    path: 'dashboard',
    component: IndexComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/investments',
    component: InvestmentsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/returns',
    component: ReturnsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/orders',
    component: OrdersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/settings',
    component: SettingsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
