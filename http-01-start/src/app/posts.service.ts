import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  private static HTTP_ADRES =
    "https://ng-complete-guide-ce1ed-default-rtdb.europe-west1.firebasedatabase.app/";
  private static SEND_POST = PostsService.HTTP_ADRES + "posts.json";

  constructor(private http: HttpClient) {}

  createPost(postData: { title: string; content: string }) {
    this.http
      .post<{ name: string }>(PostsService.SEND_POST, postData)
      .subscribe((response) => console.log(response));
  }

  public fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(PostsService.SEND_POST).pipe(
      map((resposData) => {
        const newArray: Post[] = [];
        for (const key in resposData) {
          if (resposData.hasOwnProperty(key)) {
            newArray.push({ ...resposData[key], id: key });
          }
        }
        return newArray;
      })
    );
  }
}
