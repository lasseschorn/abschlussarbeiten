import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { GrdFilterPipe } from './suchfunktion';

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
    FormsModule,
    AppRoutingModule,
  RouterModule.forRoot([
    {path: '',
    component: UebersichtComponent},
    {path: 'uebersicht',
    component: UebersichtComponent},
    {path: 'start',
    component: UebersichtComponent},
    {path: 'startseite',
    component: UebersichtComponent},
    {path: 'login',
    component: LoginComponent},
    {path: 'anmeldung',
    component: LoginComponent},
    {path: 'detail',
    component: DetailseiteComponent},
    {path: 'detailseite',
    component: DetailseiteComponent},
    {path: 'abschlussarbeit',
    component: DetailseiteComponent},
    {path: 'neuanlegen',
    component: ErstellSeiteComponent},
    {path: 'erstellseite',
    component: ErstellSeiteComponent},
    {path: 'hinzufuegen',
    component: ErstellSeiteComponent},
    {path: 'test',
    component: TestComponent}
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
    AppNavComponent,
    GrdFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
