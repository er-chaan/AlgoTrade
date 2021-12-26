import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { BotService } from '../bot.service';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';

@Component({
  selector: 'ngx-bot-instruments',
  templateUrl: './bot-instruments.component.html',
  styleUrls: ['./bot-instruments.component.scss']
})
export class BotInstrumentsComponent implements OnInit {

  constructor(
    private botService: BotService,
    private toastrService: NbToastrService,
    private service: SmartTableData
  ) {
    const data = this.service.getData();
    this.source.load(data);
  }


  ngOnInit(): void {
    this.getInstruments();
  }

  instruments: any = [];
  totalInstruments: number = 0;
  activeInstruments: number = 0;
  getInstruments() {
    this.botService.getInstruments().subscribe(
      response => {
        if (response.status) {
          this.instruments = response.data;
          this.totalInstruments = this.instruments.length;
          this.instruments.forEach(element => {
            if (element.bucket > 0) {
              this.activeInstruments++;
            }
          });
        } else {
          this.toastrService.danger(response.message, "API");
        }
      },
      error => {
        this.toastrService.danger(error.status + ' : ' + error.statusText, "API");
      });
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
