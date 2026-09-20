import { Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Comment } from '../../models/comment';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './commentForm.html',
  styleUrl: './commentForm.scss'
})
export class CommentFormComponent {

  content = new FormControl('');

  commentCreated = output<Comment>();

  constructor(
    private userService: UserService
  ) { }

  addComment() {
    const comment: Comment = {
      id: 1,
      author: this.userService.currentUser.nickname,
      content: this.content.value ?? '',
      publishedAt: new Date().toISOString()
    };

    this.commentCreated.emit(comment);
  }
}
