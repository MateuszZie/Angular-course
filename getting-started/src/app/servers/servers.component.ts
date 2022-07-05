import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  serverCreationStatus = 'No serwer was created';

  constructor() {
    setTimeout(() => {
      this.allowStartNewServer = true;
    }, 2000);
  }

  onServerCreates() {
    this.serverCreationStatus = 'Server Created';
  }

  allowStartNewServer = false;

  ngOnInit(): void {}
}
