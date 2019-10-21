import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'course-action',
  templateUrl: './course-action.component.html',
  styleUrls: ['./course-action.component.scss']
})
export class CourseActionComponent implements OnInit {
  params: any;
  id: any;

  agInit(params: any): void {
    this.params = params;
    this.id = params.value;
  }
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  editCourse() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        description: this.params.data.description,
        longDescription: this.params.data.longDescription,
        category: this.params.data.category
    };

    const dialogRef = this.dialog.open(CourseDialogComponent,
        dialogConfig);


    dialogRef.afterClosed().subscribe(
        (val) => {console.log("Dialog output:", val);
      });

  }
}
