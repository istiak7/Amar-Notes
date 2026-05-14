import { Component, inject } from '@angular/core';
import { BlogService } from '../data-access/blog.service';
import { PostCard } from '../ui/post-card/post-card';

@Component({
  selector: 'app-blog-list',
  imports: [PostCard],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss'
})
export class BlogList {
  private readonly blogService = inject(BlogService);
  readonly posts = this.blogService.posts;
}
