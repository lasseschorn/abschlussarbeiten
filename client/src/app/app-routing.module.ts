import { FileuploadComponent } from './fileupload/fileupload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DetailseiteComponent } from './detailseite/detailseite.component';
import { ErstellSeiteComponent } from './erstell-seite/erstell-seite.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
      {path: '', component: UebersichtComponent},
      {path: 'uebersicht', component: UebersichtComponent},
      {path: 'start', component: UebersichtComponent},
      {path: 'startseite', component: UebersichtComponent},
      {path: 'login', component: LoginComponent},
      {path: 'anmeldung', component: LoginComponent},
      {path: 'detail', component: DetailseiteComponent},
      {path: 'detailseite', component: DetailseiteComponent},
      {path: 'abschlussarbeit', component: DetailseiteComponent},
      {path: 'neuanlegen', component: ErstellSeiteComponent},
      {path: 'erstellseite', component: ErstellSeiteComponent},
      {path: 'hinzufuegen', component: ErstellSeiteComponent},
      {path: 'test', component: TestComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'fileupload', component: FileuploadComponent}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
