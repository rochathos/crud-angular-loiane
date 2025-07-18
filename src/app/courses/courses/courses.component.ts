import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category','actions'];

  // coursesService: CoursesService;

  constructor(
	private coursesService: CoursesService,
	public dialog: MatDialog,
  private router: Router,
  private route : ActivatedRoute
  ) {
	//this.coursesService = new CoursesService();
	//this.courses = [];
	this.courses$ = this.coursesService.list().pipe(
	  catchError(error => {
		  this.onError('Erro ao carregar Cursos');
		  return of([]);
	  })
	);
  }

  onError(errorMsg: string) {
	this.dialog.open(ErrorDialogComponent, {
	  data: errorMsg,
	});
  }

  ngOnInit(): void {}


  onAdd() {
    this.router.navigate(['new'], {relativeTo:this.route})
    console.log('onAdd')
  }

}
