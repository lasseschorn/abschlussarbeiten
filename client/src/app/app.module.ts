import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard} from './auth.guard'
import {
  MdButtonModule,
  MdCheckboxModule,
  MdTableModule,
  MdSortModule,
  MdMenuModule,
  MdIconModule,
  MdToolbarModule,
  MdListModule,
  MdCardModule,
  MdSlideToggleModule,
  MdInputModule,
  MdRadioModule,
  MdDialogModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routes';
import { QuizzService } from './services/quizz.service';
import { AnswerComponent } from './answer/answer.component';
import { NewQuizzDialogComponent } from './start-page/new-quizz-dialog/new-quizz.dialog.component';
import { QuizzManagerComponent } from './quizz-manager/quizz-manager.component';
import { PlayQuizzComponent } from './play-quizz/play-quizz.component';
import { QuizzResultsComponent } from './quizz-results/quizz-results.component';
import { ChuckService } from './services/chuck.service';
import { BrancheComponent } from './branche/branche.component';
import { RechtsformComponent } from './rechtsform/rechtsform.component';
import { StudiengangComponent } from './studiengang/studiengang.component';
import { KategorieComponent } from './kategorie/kategorie.component';
import { StudentComponent } from './student/student.component';
import { DozentComponent } from './dozent/dozent.component';
import { BetreuerComponent } from './betreuer/betreuer.component';
import { AdresseComponent } from './adresse/adresse.component';
import { UnternehmenComponent } from './unternehmen/unternehmen.component';
import { AbschlussarbeitComponent } from './abschlussarbeit/abschlussarbeit.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Adresse } from './AkaGrad';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './login/home/home.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AnswerComponent,
    NewQuizzDialogComponent,
    QuizzManagerComponent,
    PlayQuizzComponent,
    QuizzResultsComponent,
    BrancheComponent,
    RechtsformComponent,
    StudiengangComponent,
    KategorieComponent,
    StudentComponent,
    DozentComponent,
    BetreuerComponent,
    AdresseComponent,
    UnternehmenComponent,
    AbschlussarbeitComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    LogoutComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  entryComponents: [NewQuizzDialogComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCheckboxModule,
    MdTableModule,
    MdSortModule,
    MdMenuModule,
    MdIconModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdSlideToggleModule,
    MdInputModule,
    MdRadioModule,
    FormsModule,
    MdDialogModule,
    HttpModule,
    HttpClientModule,
    Adresse,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent

      },
        {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'dashboard'
        component: DasboardComponent
        canActivate: [AuthGuard]

      },
      {
        path: 'register'
        component: RegisterComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  providers: [AuthService, UserService, AuthGuard, QuizzService, ChuckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
