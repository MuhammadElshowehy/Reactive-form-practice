import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      projectName: new FormControl(
        null,
        Validators.required,
        this.isProjectNameValid
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('stable'),
      tasks: new FormArray([]),
    });
  }

  isProjectNameValid(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve) => {
      if (control.value === 'test' || control.value === 'Test') {
        resolve({ invalidNameProject: true });
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  get tasks() {
    return (this.myForm.get('tasks') as FormArray).controls;
  }
  addTask() {
    const task = new FormControl(null);
    (<FormArray>this.myForm.get('tasks')).push(task);
  }

  onSubmit() {
    console.log('____________________________');
    console.log(`Project name: ${this.myForm.get('projectName').value}`);
    console.log(`Email: ${this.myForm.get('email').value}`);
    console.log(`Project status: ${this.myForm.get('status').value}`);
    console.log(`Tasks: ${this.myForm.get('tasks').value}`);
  }
}
