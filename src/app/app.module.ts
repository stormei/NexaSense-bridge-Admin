import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { HomeComponent } from './core/components/home/home.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { LoginComponent } from './core/components/login/login.component';
import { StatusDestinationComponent} from './core/components/statusDestination/statusDestination.component';
import { StatusSystemComponent } from './core/components/statusSystem/statusSystem.component';
import { StatusOpcuaComponent } from './core/components/statusOpcua/statusOpcua.component';
import { StatusMtconnectComponent } from './core/components/statusMtconnect/statusMtconnect.component';
import { SettingsDestinationComponent } from './core/components/settingsDestination/settingsDestination.component';
import { TagTableComponent } from './shared/components/TagTable/TagTable.component';
import { GraphComponent } from './shared/components/graph/graph.component';
import '@cds/core/icon/register.js';
import { ClarityIcons,shieldCheckIcon, userIcon,cloudTrafficIcon,tagIcon,collapseCardIcon,treeViewIcon,gridViewIcon,cogIcon,pencilIcon,resizeIcon,shrinkIcon,scriptExecuteIcon} from '@cds/core/icon';
ClarityIcons.addIcons(shieldCheckIcon,userIcon,cloudTrafficIcon,tagIcon,collapseCardIcon,treeViewIcon,gridViewIcon,cogIcon,pencilIcon,resizeIcon,shrinkIcon,scriptExecuteIcon);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    StatusDestinationComponent,
    StatusSystemComponent,
    StatusOpcuaComponent,
    StatusMtconnectComponent,
    HeaderComponent,
    MenuComponent,
    TagTableComponent,
    GraphComponent,
    SettingsDestinationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
