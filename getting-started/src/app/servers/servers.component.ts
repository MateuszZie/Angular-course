import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  serverCreationStatus = 'No serwer was created';
  serverName = 'Test';
  userName = '';
  serverCreated = false;
  emptyName(): boolean {
    return this.userName.length === 0;
  }
  resetName(): void {
    this.userName = '';
  }

  constructor() {
    setTimeout(() => {
      this.allowStartNewServer = true;
    }, 2000);
  }

  onServerCreates() {
    this.serverCreated = true;
    this.serverCreationStatus = `Server ${this.serverName} Created`;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  allowStartNewServer = false;

  ngOnInit(): void {}
}
