import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { DetailseiteComponent } from './detailseite/detailseite.component';
import { ErstellSeiteComponent } from './erstell-seite/erstell-seite.component';
import { TestComponent } from './test/test.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppNavComponent } from './app-nav/app-nav.component';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  RouterModule.forRoot([
    {
      path:'',
      component: TestComponent
    },
    {
      path: 'test',
      component: TestComponent
    }
  ])
],
  providers: [],
  declarations: [
    AppComponent,
    LoginComponent,
    UebersichtComponent,
    DetailseiteComponent,
    ErstellSeiteComponent,
    TestComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppNavComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
