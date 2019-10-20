import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import {NumericEditorComponent} from '../numeric-editor/numeric-editor.component';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'mat-test',
  templateUrl: './mat-test.component.html',
  styleUrls: ['./mat-test.component.scss']
})
export class MatTestComponent implements OnInit, AfterViewInit {
  @ViewChild('myGrid', {static: true}) grid: AgGridAngular;
  rowData: Observable<Course[]>;
  constructor(private coursesService: CoursesService) {
    this.rowData = coursesService.findAllCourses();
  }
  columnDefs = [
    {headerName: 'ID', field: 'id', sortable: true, filter: true},
    {headerName: 'Decs', field: 'description', sortable: true, filter: true},
    {headerName: 'Url', field: 'iconUrl', sortable: true, filter: true},
    {headerName: 'List', field: 'longDescription', sortable: true, filter: true},
    {headerName: 'Category', field: 'category', sortable: true, filter: true},
    {headerName: 'Count', field: 'lessonsCount', sortable: true, filter: true,
      editable: true,
      cellEditor: 'numericEditorComponent'
    }
  ];
  frameworkComponents = {numericEditorComponent: NumericEditorComponent};
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.grid.api.selectAll();
  }
  onModelUpdated(event) {
    console.log(event);
  }
  onCellClicked(event) {
    console.log(event);
  }
}
