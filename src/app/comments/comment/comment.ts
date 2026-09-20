import { Component, input } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.scss'
})
export class CommentComponent {
  comment = input.required<Comment>();
}
