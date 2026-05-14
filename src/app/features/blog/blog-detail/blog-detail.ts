import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogService } from '../data-access/blog.service';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss'
})
export class BlogDetail {
  private readonly blogService = inject(BlogService);
  private readonly route = inject(ActivatedRoute);

  readonly post = this.blogService.getPost(this.route.snapshot.paramMap.get('id')!);
}
