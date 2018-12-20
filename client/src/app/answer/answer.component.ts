import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Question, Answer } from '../data.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answers: Answer[];
  @Input() editMode: boolean;
  @Input() editable: boolean;
  @Output() selectedAnswer = new EventEmitter();

  correctAnswer: Answer;

  constructor() { }

  ngOnInit() {
    // the correct answer is the first found that is correct
    this.correctAnswer = this.answers.filter(ans => ans.isCorrect)[0];
  }

  select(ans: Answer) {
    this.selectedAnswer.emit(ans);
  }

  change(newCorrectAnswer: Answer) {
    console.log(`New correct answer: '${newCorrectAnswer.text}'`);
    for (const a of this.answers) {
      a.isCorrect = a.text === newCorrectAnswer.text;
    }
  }

  remove(index: number) {
    if (this.answers.length <= 1) {
      return;
    }

    if (this.answers[index].isCorrect) {
      this.answers[0].isCorrect = true;
    }

    this.answers.splice(index, 1);
  }


  newAnswer() {
    this.answers.push({
      text: '',
      isCorrect: this.answers.length === 0,
    });
  }
}
