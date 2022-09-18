import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  private static HTTP_ADRES =
    "https://ng-complete-guide-ce1ed-default-rtdb.europe-west1.firebasedatabase.app/";
  private static SEND_POST = AppComponent.HTTP_ADRES + "posts.json";

  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post<{ name: string }>(AppComponent.SEND_POST, postData)
      .subscribe((response) => console.log(response));
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>(AppComponent.SEND_POST)
      .pipe(
        map((resposData) => {
          const newArray: Post[] = [];
          for (const key in resposData) {
            if (resposData.hasOwnProperty(key)) {
              newArray.push({ ...resposData[key], id: key });
            }
          }
          return newArray;
        })
      )
      .subscribe((response) => (this.loadedPosts = response));
  }
}
