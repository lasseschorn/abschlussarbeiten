import { AuthGuard } from './guard/auth.guard';
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
import { FormsModule } from '@angular/forms';

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
    component: TestComponent},
    {path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]},
  ]), FormsModule
],
  providers: [AuthService, AuthGuard],
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
<<<<<<< HEAD
    AdminComponent,
    LogoutComponent,
    FileuploadComponent
=======
    GrdFilterPipe
>>>>>>> 9167356c1aedfd74cb0749d106fb57a5664dbf97
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
