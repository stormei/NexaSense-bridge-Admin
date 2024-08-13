import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { PageNotFoundComponent } from './core/components/pageNotFound/pageNotFound.component';
import { StatusDestinationComponent} from './core/components/statusDestination/statusDestination.component';
import { StatusSystemComponent } from './core/components/statusSystem/statusSystem.component';
import { StatusOpcuaComponent } from './core/components/statusOpcua/statusOpcua.component';
import { StatusMtconnectComponent } from './core/components/statusMtconnect/statusMtconnect.component';
import { SettingsDestinationComponent } from './core/components/settingsDestination/settingsDestination.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'status_dest',
    component: StatusDestinationComponent
  },
  {
    path: 'status_system',
    component: StatusSystemComponent
  },
  {
    path: 'status_opcua',
    component: StatusOpcuaComponent
  },
  {
    path: 'status_mtconnect',
    component: StatusMtconnectComponent
  },
  {
    path: 'settings_dest',
    component: SettingsDestinationComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
