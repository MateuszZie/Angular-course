import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  serverCreationStatus = 'No serwer was created';
  serverName = '';

  constructor() {
    setTimeout(() => {
      this.allowStartNewServer = true;
    }, 2000);
  }

  onServerCreates() {
    this.serverCreationStatus = 'Server Created';
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  allowStartNewServer = false;

  ngOnInit(): void {}
}
