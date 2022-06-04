import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar-dialog',
  templateUrl: './toolbar-dialog.component.html',
  styleUrls: ['./toolbar-dialog.component.scss']
})
export class ToolbarDialogComponent implements OnInit {
  @Input()
  title = "";

  @Input()
  drag = true;

  @Output()
  closeDialog = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeDialog.emit(true);
  }

}
