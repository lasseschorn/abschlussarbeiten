import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { LoginComponent } from './login/login.component';
import { DetailseiteComponent } from './detailseite/detailseite.component';
import { ErstellSeiteComponent } from './erstell-seite/erstell-seite.component';

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
      {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
