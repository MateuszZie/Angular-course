import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  private static HTTP_ADRES =
    "https://ng-complete-guide-ce1ed-default-rtdb.europe-west1.firebasedatabase.app/";
  private static SEND_POST = PostsService.HTTP_ADRES + "posts.json";

  constructor(private http: HttpClient) {}

  createPost(postData: { title: string; content: string }) {
    return this.http.post<{ name: string }>(PostsService.SEND_POST, postData, {
      observe: "response",
    });
  }

  public fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("first", "param");
    searchParams = searchParams.append("second", "param");
    return this.http
      .get<{ [key: string]: Post }>(PostsService.SEND_POST, {
        headers: new HttpHeaders({ "Custom-Header": "Hello" }),
        params: searchParams,
      })
      .pipe(
        map(
          (resposData) => {
            const newArray: Post[] = [];
            for (const key in resposData) {
              if (resposData.hasOwnProperty(key)) {
                newArray.push({ ...resposData[key], id: key });
              }
            }
            return newArray;
          },
          catchError((err) => {
            return throwError(err);
          })
        )
      );
  }

  public deletePosts() {
    return this.http
      .delete(PostsService.SEND_POST, {
        observe: "events",
        responseType: "text",
      })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
            console.log(event);
          } else if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
