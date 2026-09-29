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
    const userId = this.comment().userId;

    if (userId === null) {
      return undefined;
    }

    return this.userService.getUserById(userId);
  }
}
