import { Component, OnInit } from "@angular/core";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isLoading = false;

  loadedPosts: Post[] = [];

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.fetchPosts();
    this.postService.loadedPosts.subscribe((posts) => {
      this.loadedPosts = posts;
      this.isLoading = false;
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
    this.postService.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}
