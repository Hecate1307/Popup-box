import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {
  id: number;

  constructor(private dataService: DataStorageService,
    public dialogRef: MatDialogRef<DeletePostComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.id = data;
  }

  ngOnInit(): void {
  }
  save() {
    this.dataService.deleteData(this.id).subscribe(
      data => { console.log(data) });
    this.dataService.ShowedPostDeleted.next(this.id);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
