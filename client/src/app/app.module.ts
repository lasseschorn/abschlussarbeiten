import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './admin.guard';
import { AuthService } from './service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { AdminComponent } from './admin/admin.component';
import { LogoutComponent } from './logout/logout.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { PersonErstellseiteComponent } from './person-erstellseite/person-erstellseite.component';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  RouterModule.forRoot([
    {path: '',
    component: UebersichtComponent,
    canActivate: [AuthGuard]},
    {path: 'uebersicht',
    component: UebersichtComponent,
    canActivate: [AuthGuard]},
    {path: 'start',
    component: UebersichtComponent,
    canActivate: [AuthGuard]},
    {path: 'startseite',
    component: UebersichtComponent,
    canActivate: [AuthGuard]},
    {path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]},
    {path: 'anmeldung',
    component: LoginComponent,
    canActivate: [AuthGuard]},
    {path: 'detail',
    component: DetailseiteComponent,
    canActivate: [AuthGuard]},
    {path: 'detailseite',
    component: DetailseiteComponent,
    canActivate: [AuthGuard]},
    {path: 'abschlussarbeit',
    component: DetailseiteComponent,
    canActivate: [AuthGuard]},
    {path: 'neuanlegen',
    component: ErstellSeiteComponent,
    canActivate: [AuthGuard]},
    {path: 'erstellseite',
    component: ErstellSeiteComponent},
    {path: 'personerstellseite',
    component: PersonErstellseiteComponent,
    canActivate: [AuthGuard]},
    {path: 'hinzufuegen',
    component: ErstellSeiteComponent,
    canActivate: [AuthGuard]},
    {path: 'test',
    component: TestComponent,
    canActivate: [AuthGuard]},
    {path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]},
    {path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]}
  ])
],
  providers: [AuthService, AdminGuard, AuthGuard],
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
    AdminComponent,
    LogoutComponent,
    FileuploadComponent,
    GrdFilterPipe,
    PersonErstellseiteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
