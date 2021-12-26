import { Component } from '@angular/core';

import { MENU_ITEMS, BOT_MENU_ITEMS, ZERODHA_MENU_ITEMS } from '../app-menu';

@Component({
  selector: 'ngx-bot',
  styleUrls: ['./bot.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="bot_menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class BotComponent {

  menu = MENU_ITEMS;
  bot_menu = BOT_MENU_ITEMS;
  zerodha_menu = ZERODHA_MENU_ITEMS;

}
