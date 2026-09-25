import { Component, input } from '@angular/core';
import { Comment } from '../../models/comment';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.scss'
})
export class CommentComponent {
  constructor(
    private userService: UserService
  ) { }
  comment = input.required<Comment>();
  get user() {
    return this.userService.getUserById(this.comment().userId);
  }
}
