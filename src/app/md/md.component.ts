import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Module, AllModules } from '@ag-grid-enterprise/all-modules';
//import { AgGridAngular } from '@ag-grid-community/angular';
@Component({
  selector: 'md',
  templateUrl: './md.component.html',
  styleUrls: ['./md.component.scss']
})

export class MdComponent {
  //@ViewChild('myGrid', {static: true}) grid: AgGridAngular;
  private gridApi;
  private gridColumnApi;
  public modules = AllModules;

  private columnDefs;
  private detailCellRendererParams;
  private rowData;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'master_name',
        cellRenderer: 'agGroupCellRenderer'
      },
      { field: "col1" },
      { field: "col2" },
      {
        field: "col3",
        //valueFormatter: "x.toLocaleString() + 'm'"
      }
    ];
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: "detail_name" },
          { field: "col1" },
          { field: "col2" },
          {
            field: "col3",
            //valueFormatter: "x.toLocaleString() + 's'"
          },
          { field: "masterId" }
        ],
        onFirstDataRendered: function(params) {
          params.api.sizeColumnsToFit();
        }
      },
      getDetailRowData: function(params) {
        params.successCallback(params.data.details);
      }
    };
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
    setTimeout(function() {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        //"https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json"
          'http://localhost:3000/masters?filter[include][][relation]=details'
        )
      .subscribe(data => {
        this.rowData = data;
      });
      /*
      this.grid.gridOptions.onCellEditingStopped = (event) => {
        console.log(event);
      };*/
  }
}
