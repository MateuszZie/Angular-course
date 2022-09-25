import { Component } from '@angular/core';
import { DataStorageService } from '../shered/data-stored.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class Header {
  constructor(private dataStorageService: DataStorageService) {}

  onSave() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes();
  }
}
