import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() pageChanged = new EventEmitter<string>();

  onSelect(pageId: string) {
    this.pageChanged.emit(pageId);
  }

}