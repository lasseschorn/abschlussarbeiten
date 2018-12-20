# QuizzManiac

This project was initially generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Code overview

Please see the `quizzmaniac-map.png` file for details on how the project is structured and an idea of the flow.

### Components

You will find the following components in the source code:

- **Question**. Holds information about a question: text of the question itself, possible answers, and state representing whether the question is being edited or is editable.
- **Answer**. Holds a possible answer to a question and state to control editing. It also controls selecting correct answers for a question when editing it.

### Pages

- **Start Page**. The app begins here. You can play existing quizzes or create a new one.
- **Quizz Manager**. Create or edit existing quizzes from this page.
- **QuestionList**. Edit the questions, answers or name of a quizz.
- **Play Quizz**. Run through the questions of a quizz, selecting answers as you go.
- **Quizz Results**. When you finish a quizz you will be presented with a summary of the answers you provided.
- **404**. Not Found page.

# Angular CLI goodies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
