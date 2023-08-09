import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BadgeType, BadgeOutput } from '../badge/badge.component';

interface profile {
  profileId: number,
  user: {
    email: string,
    firstName: string,
    middleName: string,
    lastName: string,
    birthday: string,
    school: string,
    grade: number,
    coverLetters: [],
    experiences: [],
    skills: string,
    intrestsHobbies: string,
    awards: string
  }
}

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent{
  constructor(private formBuilder: FormBuilder, private api: APIService, private router: Router, private toastr: ToastrService) {}
  clickedSubmit: boolean = false;
  // Dynamic model change.
  currSkill: string = '';
  currIntHob: string = '';
  currAward: string = '';
  BadgeType = BadgeType;
  // Collection of skills, interests and hobbies, and awards.
  skills: Array<string> = new Array<string>;
  interestsHobbies: Array<string> = new Array<string>;
  awards: Array<string> = new Array<string>;
  // Methods for dynamic profile
  onChangeSkill() {
    if (!this.currSkill.includes(',') || !this.currSkill.length) return;
    this.addItem(BadgeType.Skill);
  }
  onChangeIntHob() {
    if (!this.currIntHob.includes(',') || !this.currIntHob.length) return;
    this.addItem(BadgeType.InterestHobby);
  }
  onChangeAward() {
    if (!this.currAward.includes(',') || !this.currAward.length) return;
    this.addItem(BadgeType.Award);
  }
  extractString(input: string): string {
    let item: string = input.split(',', 1)[0];
    item.trim();
    return item;
  }
  addItem(itemType: BadgeType) {
    switch(itemType) {
      case BadgeType.Skill:
        let skill = this.extractString(this.currSkill);
        this.currSkill = '';
        if (skill.length > 0)
          this.skills.push(skill);
        break;
      case BadgeType.InterestHobby:
        let intHob = this.extractString(this.currIntHob);
        this.currIntHob = '';
        if (intHob.length > 0)
          this.interestsHobbies.push(intHob);
        break;
      case BadgeType.Award:
        let award = this.extractString(this.currAward);
        this.currAward = '';
        if (award.length > 0)
          this.awards.push(award);
        break;
    }
  }
  deleteBadge(output: BadgeOutput) {
    switch(output.type) {
      case BadgeType.Skill:
        if (!this.skills.includes(output.value)) {
          console.error(`Unable to find skill ${output.value} in skills list.`);
          this.toastr.error("An unexpected error occurred.");
        }
        this.skills.splice(this.skills.indexOf(output.value), 1);
        break;
      case BadgeType.InterestHobby:
        if (!this.interestsHobbies.includes(output.value)) {
          console.error(`Unable to find interest/hobby ${output.value} in interests/hobbies list.`);
          this.toastr.error("An unexpected error occurred.");
        }
        this.interestsHobbies.splice(this.interestsHobbies.indexOf(output.value), 1);
        break;
      case BadgeType.Award:
        if (!this.awards.includes(output.value)) {
          console.error(`Unable to find award ${output.value} in awards list.`);
          this.toastr.error("An unexpected error occurred.");
        }
        this.awards.splice(this.awards.indexOf(output.value), 1);
        break;
      default:
        console.error("Value entered outside of enum values for BadgeType.");
        this.toastr.error("An unexpected error occurred.");
        return;
    }
    this.toastr.success("Successfully removed item!");
  }
  onKeypress(e: any, type: BadgeType) {
    if (e.key == ",") {
      if ((type == BadgeType.Skill && !this.currSkill.length)
        || (type == BadgeType.InterestHobby && !this.currIntHob.length)
        || (type == BadgeType.Award && !this.currAward.length))
        e.preventDefault();
    }
  }
  // Rest of component
  add_exp = false;
  num_exp = 0;
  experiences = Array(this.num_exp);
  student_profile : profile = {profileId: -1, user: {email: "", firstName: "", middleName: "", lastName: "", birthday: "", school: "",grade: -1, coverLetters: [], experiences: [], skills: "", intrestsHobbies: "", awards: ""}};

  exp_form = this.formBuilder.group({
    start: '',
    end: '',
    position: '',
    company:'',
    location: '',
    description: ''
  }
  )

  about_form = this.formBuilder.group({
    skills: '',
    hobbies: '',
    awards: '',
  }
  )

  addExperience(){
    this.add_exp =true;
    this.num_exp++;

    this.exp_form.reset();
  }

  submitProfile(){
    // Disable button.
    this.clickedSubmit = true;
    // Update the rest of the fields if any.
    this.addItem(BadgeType.Skill);
    this.addItem(BadgeType.Award);
    this.addItem(BadgeType.InterestHobby);
    // Attempt to create profile
    let skillStr = this.skills.join(',');
    let intHobStr = this.interestsHobbies.join(',');
    let awardStr = this.awards.join(',');
    this.api.createProfile(skillStr, intHobStr, awardStr).subscribe({
      next: res => {
        this.toastr.success("Successfully added profile.");
        this.router.navigate(['/student/profile'])
      }, 
      error: err => {
        console.error(err);
        this.toastr.error("There was an internal error.");
        // Enable button
        this.clickedSubmit = false;
      }
    });
  }
}
