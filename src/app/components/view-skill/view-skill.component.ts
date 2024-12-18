import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-skill',
  imports: [CommonModule],
  templateUrl: './view-skill.component.html',
  styleUrl: './view-skill.component.css',
})
export class ViewSkillComponent {
  @Input() folder = '';
  @Input() url = '';
  @Input() show = false;
}
