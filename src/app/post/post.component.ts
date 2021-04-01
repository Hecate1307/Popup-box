import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { UpdatePostComponent } from '../update-post/update-post.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  componentFactoryResolver: any;
  @ViewChild('f') form: NgForm;

  constructor(private dataService: DataStorageService,
    private matDialog: MatDialog,
  ) { }

  postData = [];
  isDelete = false;
  deletedID = -1;
  showNewForm = false;
  showUpdateForm = false;
  currentId = -1;
  currentTitle = null;
  currentContent = null;

  openDialogNew() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    this.matDialog.open(CreatePostComponent, dialogConfig);
  }
  onDelete(post) {
    this.deletedID = post.id;
    this.openDialogDelete();
    console.log("delete" + post.title);
  }

  openDialogDelete() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = this.deletedID;

    this.matDialog.open(DeletePostComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.dataService.fetchData().subscribe(data => this.postData = data);
    this.dataService.ShowedPostAdded.subscribe(state => {
      this.postData.unshift(state);
    });
    this.dataService.ShowedPostDeleted.subscribe(id => {
      this.postData = this.postData.filter(postEle =>
        postEle.id !== this.deletedID);
    });

    this.dataService.ShowedPostUpdated.subscribe(data => {
      for (let postEle of this.postData) {
        if (postEle.id === data.id) {
          postEle.title = data.title;
          postEle.body = data.body;
          break;
        }
      }
    });

  }

  onUpdate(post) {
    this.currentId = post.id;
    this.currentTitle = post.title;
    this.currentContent = post.body;
    this.openDialogUpdate();
  }

  openDialogUpdate() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = { id: this.currentId, title: this.currentTitle, content: this.currentContent };
    this.matDialog.open(UpdatePostComponent, dialogConfig);
  }
}
