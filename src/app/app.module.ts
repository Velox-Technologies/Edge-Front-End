import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './routes/authentication/authentication.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { IndexComponent } from './routes/dashboard/index/index.component';
import { LucideAngularModule } from 'lucide-angular';
import iconList from './utils/icons';
import { DropdownComponent } from './components/common/dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/common/toast/toast.component';
import { ToastService } from './services/common/toast/toast.service';
import { AccordionComponent } from './components/common/accordion/accordion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/common/modal/modal.component';
import { DrawerComponent } from './components/common/drawer/drawer.component';
import { CardComponent } from './components/common/card/card.component';
import { DataTableComponent } from './components/common/data-table/data-table.component';
import { DashboardLayoutComponent } from './components/layouts/dashboard-layout/dashboard-layout.component';
import { OrdersComponent } from './routes/dashboard/orders/orders.component';
import { InvestmentsComponent } from './routes/dashboard/investments/investments.component';
import { ReturnsComponent } from './routes/dashboard/returns/returns.component';
import { SettingsComponent } from './routes/dashboard/settings/settings.component';
import { StepperComponent } from './components/common/stepper/stepper.component';
import { AreaComponent } from './components/common/charts/area/area.component';
import { BarComponent } from './components/common/charts/bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    IndexComponent,
    DropdownComponent,
    ToastComponent,
    AccordionComponent,
    ModalComponent,
    DrawerComponent,
    CardComponent,
    DataTableComponent,
    DashboardLayoutComponent,
    OrdersComponent,
    InvestmentsComponent,
    ReturnsComponent,
    SettingsComponent,
    StepperComponent,
    AreaComponent,
    BarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick(iconList),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    ToastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
