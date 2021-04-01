import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  ShowedPostAdded = new Subject<{ title: string, body: string }>();
  ShowedPostDeleted = new Subject<number>();
  ShowedPostUpdated = new Subject<{ id: number, title: string, body: string }>();


  constructor(private http: HttpClient) { }

  fetchData() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

  deleteData(id: number) {
    return this.http
      .delete(
        `http://localhost:3000/posts/${+id}`,
      );
  }

  updateData(id: any, title: string, content: string) {
    const postData = { title: title, body: content };
    return this.http.put<any>(`http://localhost:3000/posts/${+id}`,
      postData);
  }

  createAndStorePost(title: string, content: string) {
    const postData = { title: title, body: content };
    this.http
      .post<any>(
        'http://localhost:3000/posts',
        postData
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        }
      );

  }
}
