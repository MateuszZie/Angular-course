import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styles: [
    `
      .white {
        color: white;
      }
    `,
  ],
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  serverCreationStatus = 'No serwer was created';
  serverName = 'Test';
  userName = '';
  serverCreated = false;
  servers = ['test', 'test2'];
  showSecret = true;
  id = 1;
  audClickButton: Array<{ id: number; date: string }> = [];

  displayDetails(): void {
    this.showSecret = !this.showSecret;
    this.audClickButton.push({
      id: this.id,
      date: new Date().toLocaleString(),
    });
    this.id++;
  }

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
    this.servers.push(this.serverName);
    this.serverCreationStatus = `Server ${this.serverName} Created`;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  allowStartNewServer = false;

  ngOnInit(): void {}
}
