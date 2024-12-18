import { DEFAULT_SKILLS } from '@/consts/skills';
import { NameSkill } from '@/models/enums/name-skill.enum';
import { Skill } from '@/models/types/skill.type';
import { Injectable } from '@angular/core';

@Injectable()
export class SkillsService {
  private readonly defaultSkills = DEFAULT_SKILLS;
  skills: Skill[];
  timer?: any;

  constructor() {
    this.skills = this.defaultSkills.map((skill) => ({ ...skill }));
  }

  private showRandomSkill(): void {
    const skillsNotShow = this.skills.filter((skill) => !skill.show);
    if (!skillsNotShow.length) return;
    const skillNotShow =
      skillsNotShow[Math.floor(Math.random() * skillsNotShow.length)];
    this.skills = this.skills.map((skill) => {
      if (skill.name === skillNotShow.name) skill.show = true;
      return skill;
    });
  }

  reset(): void {
    this.destroy();
    this.skills = this.defaultSkills.map((skill) => ({ ...skill }));
  }

  init(): void {
    this.showRandomSkill();
    this.timer = setInterval(() => {
      this.showRandomSkill();
    }, 10000);
  }

  destroy(): void {
    clearInterval(this.timer);
  }

  getSkill(name: NameSkill): Skill {
    return this.skills.find((skill) => skill.name === name)!;
  }
}
