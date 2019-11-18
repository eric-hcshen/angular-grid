import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Module, AllModules } from '@ag-grid-enterprise/all-modules';
import { AgGridAngular } from '@ag-grid-community/angular';
@Component({
  selector: 'md',
  templateUrl: './md.component.html',
  styleUrls: ['./md.component.scss']
})

export class MdComponent {
  @ViewChild('agGrid', {static: true}) grid: AgGridAngular;
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
        cellRenderer: 'agGroupCellRenderer',
        editable: true
      },
      { field: "col1", editable: true },
      { field: "col2", editable: true },
      {
        field: "col3", editable: true
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
  onAdd(event) {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    this.http.post('http://localhost:3000/masters',
    {master_name: 'XXX', col1: 'test1', col2: 'test2', col3: 'test3'},
    {headers}).subscribe(response => {
      console.log(response);
    });
    this.refresh();
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
    setTimeout(function() {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  }
  refresh () {
    this.http
    .get(
      //"https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json"
        'http://localhost:3000/masters?filter[include][][relation]=details'
      )
    .subscribe(data => {
      this.rowData = data;
    });
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
      this.grid.gridOptions.onCellEditingStopped = (event) => {
        console.log(event.value + event.colDef.field + event.data.id);
        console.log(`http://localhost:3000/masters/{${event.data.id}}`);
        console.log(`{${event.colDef.field}=${event.value}}`);
        console.log(event);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams({
          fromObject: { master_name: 'test02'} //<==not work
          });
        this.http.patch(`http://localhost:3000/masters/${event.data.id}`,
         //`"{"${event.colDef.field}"="${event.value}"}"`
         //params
         event.data
         , {headers})
         .subscribe(data => {
           console.log(data); //`${event.colDef.field}=${event.value}`
         });
      };
  }
}
