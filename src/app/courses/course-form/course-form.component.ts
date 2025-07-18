import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';


@Component({
	selector: 'app-course-form',
	templateUrl: './course-form.component.html',
	styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

	form: UntypedFormGroup;

	constructor(private formBuilder: UntypedFormBuilder,
    private servive: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
	this.form = this.formBuilder.group({
	  name:[null],
	  category:[null]

	});
  }

  onSubmit(): void{
    this.servive.save(this.form.value).subscribe(result =>this.onSuccess(),
    error => this.onError());
  }


  onCancel(): void{
    console.log("cancel aqui rapaz")
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso ! ','',{ duration: 5000 });
    this.onCancel();
  }


  private onError(){
    this.snackBar.open('Erro ao salvar curso','',{ duration: 5000 });
  }

	ngOnInit(): void {
	}



}
