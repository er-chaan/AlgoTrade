import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ZerodhaService } from '../zerodha.service';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

@Component({
  selector: 'ngx-zerodha-instruments',
  templateUrl: './zerodha-instruments.component.html',
  styleUrls: ['./zerodha-instruments.component.scss']
})
export class ZerodhaInstrumentsComponent implements OnInit {

  loading: boolean = false;
  settings = {
    pager: {
      perPage: 10,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
        filter: false
      },
      symbol: {
        title: 'Symbol',
        type: 'string',
      },
      instrumentCode: {
        title: 'InstrumentCode',
        type: 'string',
        filter: false
      },
      feedCode: {
        title: 'FeedCode',
        type: 'string',
        filter: false
      },
      lastCandleUpdate: {
        title: 'LastCandleUpdate',
        type: 'string',
        editable: false,
        addable: false,
        filter: false
      },
      status: {
        title: 'Status',
        type: 'string',
        editable: false,
        addable: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private zerodhaService: ZerodhaService,
    private toastrService: NbToastrService,
    private service: SmartTableData
  ) { }


  ngOnInit(): void {
    this.instruments_retrieve();
  }

  instrumentsData: any = [];
  totalInstruments: number = 0;
  activeInstruments: number = 0;

  instruments_retrieve() {
    this.loading = true;
    this.zerodhaService.instruments_retrieve().subscribe(
      response => {
        if (response.status == "success") {
          this.instrumentsData = response.data;
          this.totalInstruments = response.data.length;
          this.source.load(this.instrumentsData);
          this.loading = false;
        } else {
          this.toastrService.danger(response.message, "KITE");
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
        this.toastrService.danger(error.status + ' : ' + error.statusText, "KITE");
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      // ----
      this.loading = true;
      this.zerodhaService.instruments_delete(event.data).subscribe(
        response => {
          if (response.status == "success") {
            this.toastrService.success(response.message, "KITE");
            this.loading = false;
            event.confirm.resolve();
          } else {
            this.toastrService.danger(response.message, "KITE");
            this.loading = false;
            event.confirm.reject();
          }
        },
        error => {
          this.loading = false;
          this.toastrService.danger(error.status + ' : ' + error.statusText, "KITE");
          event.confirm.reject();
        });
      // ----
    } else {
      event.confirm.reject();
    }
  }
  onAddClient(event) {
    if (event.newData.symbol && event.newData.instrumentCode && event.newData.feedCode) {
      event.newData.lastCandleUpdate = "09:00";
      event.newData.status = "READY";
      // ----
      this.loading = true;
      this.zerodhaService.instruments_create(event.newData).subscribe(
        response => {
          if (response.status == "success") {
            this.toastrService.success(response.message, "KITE");
            this.loading = false;
            event.newData.id = response.data;
            // event.confirm.resolve();
            this.instruments_retrieve();
          } else {
            this.toastrService.danger(response.message, "KITE");
            this.loading = false;
            event.confirm.reject();
          }
        },
        error => {
          this.loading = false;
          this.toastrService.danger(error.status + ' : ' + error.statusText, "KITE");
          event.confirm.reject();
        });
      // ----
    } else {
      this.toastrService.danger('Input Error !', "KITE");
    }
  }
  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to edit?')) {
      if (event.newData.symbol && event.newData.instrumentCode && event.newData.feedCode) {
        // ----
        this.loading = true;
        this.zerodhaService.instruments_update(event.newData).subscribe(
          response => {
            if (response.status == "success") {
              this.toastrService.success(response.message, "KITE");
              this.loading = false;
              event.confirm.resolve();
            } else {
              this.toastrService.danger(response.message, "KITE");
              this.loading = false;
              event.confirm.reject();
            }
          },
          error => {
            this.loading = false;
            this.toastrService.danger(error.status + ' : ' + error.statusText, "KITE");
            event.confirm.reject();
          });
        // ----
      } else {
        this.toastrService.danger('Input Error !', "KITE");
      }
    } else {
      event.confirm.reject();
    }

  }

}
