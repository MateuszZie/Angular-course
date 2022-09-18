import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  private static HTTP_ADRES =
    "https://ng-complete-guide-ce1ed-default-rtdb.europe-west1.firebasedatabase.app/";
  private static SEND_POST = AppComponent.HTTP_ADRES + "posts.json";

  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(AppComponent.SEND_POST, postData)
      .subscribe((response) => console.log(response));
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
