import { Component, output, input } from '@angular/core';
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

  targetType = input.required<string>();
  targetId = input.required<number>();

  commentCreated = output<Comment>();

  constructor(
    private userService: UserService
  ) { }

  addComment() {
    const comment: Comment = {
      id: 1,
      targetType: this.targetType(),
      targetId: this.targetId(),
      userId: this.userService.currentUser()?.id ?? null,
      content: this.content.value ?? '',
      publishedAt: new Date().toISOString()
    };

    this.commentCreated.emit(comment);
  }
}
