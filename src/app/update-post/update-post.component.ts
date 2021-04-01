import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  form: FormGroup;
  id: number;
  title: string;
  content: string;

  constructor(public dialogRef: MatDialogRef<UpdatePostComponent>,
    private dataService: DataStorageService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;

  }


  save() {
    const newtitle = this.form.value.title;
    const newcontent = this.form.value.content;
    this.dataService.updateData(this.id, newtitle, newcontent).subscribe(
      data => {
        console.log(data);
      });
    this.dataService.ShowedPostUpdated.next({ id: this.id, title: newtitle, body: newcontent });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
    this.form.setValue({
      title: this.title,
      content: this.content,
    });
  }

}
