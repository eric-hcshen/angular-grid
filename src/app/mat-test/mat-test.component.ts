import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import {NumericEditorComponent} from '../numeric-editor/numeric-editor.component';
import { AgGridAngular } from 'ag-grid-angular';
//import { AgGridModule as AgGridAngular} from '@ag-grid-community/angular';
import { RowNode, SelectCellEditor, RowSelectedEvent } from 'ag-grid-community';
import { CourseActionComponent } from '../course-action/course-action.component';

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
    {headerName: 'ID', field: 'id', sortable: true, filter: true,
    cellRenderer: 'courseActionComponent',
    autoHeight: true
    },
    {headerName: 'Decs', field: 'description', sortable: true, filter: true, editable: true},
    {headerName: 'Url', field: 'iconUrl', sortable: true, filter: true},
    {headerName: 'List', field: 'longDescription', sortable: true, filter: true},
    {headerName: 'Category', field: 'category', sortable: true, filter: true},
    {headerName: 'Count', field: 'lessonsCount', sortable: true, filter: true,
      editable: true,
      cellEditor: 'numericEditorComponent'
    }
  ];
  frameworkComponents = {numericEditorComponent: NumericEditorComponent, courseActionComponent: CourseActionComponent};
  ngOnInit() {
    this.rowData.subscribe((courses: Course[]) => this.grid.api.setRowData(courses));
  }
  ngAfterViewInit(): void {
    //this.grid.api.selectAll();
    //this.grid.api.forEachNode((rowNode: RowNode, index: number) => console.log(rowNode.data));
    console.log('After View Init');
  }
  onGridReady(event) {
    console.log('Grid Ready');
    console.log(event);
    this.grid.gridOptions.onRowSelected = (event) => { console.log(event)};
    this.grid.gridOptions.onRowClicked = (event) => { console.log(event)};
    this.grid.gridOptions.onCellClicked = (event) => { console.log(event)};
    this.grid.defaultColDef = {editable: true, resizable: true};
  }
  onModelUpdated(event) {
    //console.log(event);
    //this.grid.api.forEachNode((rowNode: RowNode, index: number) => console.log(rowNode.data.id));
    //this.grid.api.selectAll();
    //const selected = this.grid.api.getSelectedNodes();
    //this.grid.gridOptions.onRowSelected = (event) => { console.log(event)};
  }
  onCellClicked(event) {
    //console.log(event);
  }
}
