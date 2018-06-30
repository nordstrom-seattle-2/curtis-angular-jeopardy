import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nordstrom Engineering Minicamp';
  score = 0;

  question = '';
  categoryName = '';
  value = 0;
  submittedAnswer = '';
  answer = '';

  constructor(private httpClient: HttpClient) {
  }

  checkAnswer() {
    if (this.answer.toLowerCase() === this.submittedAnswer.toLowerCase()) {
      this.score += this.value;
    } else {
      this.score -= this.value;
    }
    this.submittedAnswer = '';
    this.ngOnInit();
  }

  ngOnInit() {
    this.httpClient
      .get('http://jservice.io/api/random')
      .pipe(
        map(clues => clues[0]),
      )
      .subscribe(clue => {
        this.question = clue.question;
        this.categoryName = clue.category.title;
        this.value = clue.value;
        this.answer = clue.answer;
      });
  }
}
