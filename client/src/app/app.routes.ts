import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './question/question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StartPageComponent } from './start-page/start-page.component';
import { QuizzManagerComponent } from './quizz-manager/quizz-manager.component';
import { PlayQuizzComponent } from './play-quizz/play-quizz.component';
import { QuizzResultsComponent } from './quizz-results/quizz-results.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/start' },
    { path: 'start', component: StartPageComponent },
    { path: 'play/:id', component: PlayQuizzComponent },
    { path: 'result', component: QuizzResultsComponent },
    { path: 'manage/:id', component: QuestionListComponent },
    { path: 'manage', component: QuizzManagerComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        { enableTracing: true })], // <-- debugging purposes only)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
    QuestionsComponent,
    QuestionListComponent,
    PageNotFoundComponent,
    StartPageComponent,
    QuizzManagerComponent,
    PlayQuizzComponent,
    QuizzResultsComponent,
];
