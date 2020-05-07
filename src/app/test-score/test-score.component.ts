import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ITest {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<ITest> = [];
  params: string;
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.tests = await this.loadTests();
  }
  async loadTests() {
    let tests = JSON.parse(localStorage.getItem('tests'));
    if (tests && tests.length > 0) {
    } else {
      tests = await this.loadTestsFromJson();
    }
    // console.log('this.tests from ngOninit...', this.tests);
    this.tests = tests;
    return tests;
  }
  async loadTestsFromJson() {
    const tests = await this.http.get('assets/tests.json').toPromise();
    return tests.json();
  }
  addTest() {
    const test: ITest = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null,
    };
    this.tests.unshift(test);
    this.saveToLocalStorage();
  }
  deleteTest(index: number) {
    this.tests.splice(index, 1);
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
  }
  // finalize() {
  //   const data = this.calculate();
  //   localStorage.setItem('calculateData', JSON.stringify(data));
  //   this.router.navigate(['home', data]);
  // }
  // calculate() {
  //   const grade = 0;
  //   for (let i = 0; i < this.tests.length; i++) {
  //     if (grade >= .90) {
  //     }
  //     // grade += this.tests[i].grade;
  //   }
  //   return {
  //     numberOfTests: this.tests.length,
  //   };
  // }
}
