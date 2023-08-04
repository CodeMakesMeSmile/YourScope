import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { APIService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from 'src/app/services/jwt.service';
import { StudentSchedule } from '../student-courses/student-courses.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ top: "20%", opacity: 0 }),
            animate('0.15s ease-out',
                    style({ top: "25%", opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ top: "25%", opacity: 1 }),
            animate('0.15s ease-in',
                    style({ top: "20%", opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AddCourseComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() animationDuration: number = 0;
  @Input() yearNumber: number = 0;
  @Output() onClickCloseEvent = new EventEmitter<void>();
  @Output() onCourseAdded = new EventEmitter<void>();
  schedule: StudentSchedule = new StudentSchedule(-1, -1, []);
  page: number = 1;
  maxPage: number = 1;
  offeredCourses: any = [];
  selectedCourse: boolean = false;
  course: any = {};
  confirmNoPrereqs: boolean = false;
  confirmWithPrereqs: boolean = false;
  currentCourses = <any> [];
  prerequisites = <any> [];
  courseReqs = <any> [];
  recommendedCourses = "";
  coursePrereqs = "";

  schoolId: number = 0;
  search: string | undefined = undefined;
  selectedGrade: number | string | undefined = undefined;
  selectedDiscipline: string | undefined = undefined;

  grades = [{g: "Any"}, {g: 9}, {g: 10}, {g: 11}, {g: 12}];
  disciplines = ["Any",
                 "Alternative Studies",
                 "Arts",
                 "Business Studies",
                 "Canadian and World Studies",
                 "Civics/Career Studies",
                 "Classical and International Languages",
                 "Computer Studies",
                 "Cooperative Education",
                 "Dual Credit",
                 "English",
                 "English as a Second Language",
                 "First Nations, Métis and Inuit Studies",
                 "French As A Second Language",
                 "Guidance and Career Education",
                 "Health and Physical Education",
                 "Mathematics",
                 "Online Learning Courses",
                 "Online Learning Opt-out",
                 "Personalized Alternative Studies",
                 "Science",
                 "Social Sciences and Humanities",
                 "Technological Education"
                ];

  constructor(private api: APIService, private cookie: CookieService, private jwt : JwtService, private toastr: ToastrService) {}

  parsePrereqs(prereqs: string | undefined) {
    if (prereqs == undefined || prereqs == "") return "None";
    else return prereqs.replaceAll(",", " or ");
  }

  async checkCoursePrereqs(){
    this.coursePrereqs = this.course.prerequisites;
    if (this.coursePrereqs == ""){
      this.confirmNoPrereqs = true; 
    } else {
      this.prerequisites = this.coursePrereqs.split(",")
      
      const user = JSON.parse(this.cookie.get('userObject'));
      let userID = user.userId;
  
      let result = await this.api.getStudentSchedule(userID);

      this.schedule = result;

      this.prerequisites.forEach((courseID: string) => {
        this.schedule.years.forEach((year: any) => {
          if (year.yearNumber <= this.yearNumber){
            year.courses.forEach((courseInfo: any) => {
              let modified_courseID = courseInfo.courseCode.substring(0,5)
              if (courseID == modified_courseID){
                this.confirmNoPrereqs = true; 
              }

            });
          }
        });
      });
    }

    if(this.confirmNoPrereqs == false){
      this.confirmWithPrereqs = true; 
    }
  }

  addCourse() {
    this.checkCoursePrereqs();
  }

  confirmAddition(result: boolean) {
    this.confirmWithPrereqs = false;
    this.confirmNoPrereqs = false;
    if (result) {
      this.api.addCourseToSchedule(this.yearNumber, this.course.courseId).subscribe({
        next: res => {
          this.onCourseAdded.emit()
        }, 
        error: err => {
          this.toastr.error("There was an internal error.");
        }
      });
    }
  }

  checkAny() {
    if (this.selectedGrade == "Any") this.selectedGrade = undefined;
    if (this.selectedDiscipline == "Any") this.selectedDiscipline = undefined;
  }

  searchQuery() {
    this.checkAny();
    this.page = 1;
    this.getCourses(true, this.search, (typeof this.selectedGrade === "number" ? this.selectedGrade : undefined), this.selectedDiscipline);
  }

  closeCourseView() {
    this.visible = false;
  }

  onClickCloseButton() {
    this.closeCourseView();
    setTimeout(() => this.onClickCloseEvent.emit(), this.animationDuration + 150);
  }

  selectCourse(index: number) {
    this.course = this.offeredCourses[index];
    this.selectedCourse = true;
  }

  returnToSearch() {
    this.course = {};
    this.selectedCourse = false;
  }

  nextPage() {
    this.page++;
    this.checkAny();
    this.getCourses(false, this.search, (typeof this.selectedGrade === "number" ? this.selectedGrade : undefined), this.selectedDiscipline);
  }

  prevPage() {
    this.page--;
    this.checkAny();
    this.getCourses(false, this.search, (typeof this.selectedGrade === "number" ? this.selectedGrade : undefined), this.selectedDiscipline);
  }

  getCourses(recount: boolean, searchQuery?: string, grade?: number, disciplines?: string) {
    this.api.getCourses(this.schoolId, searchQuery, grade, disciplines, (this.page - 1) * 10, 10).subscribe((res: any) => {
      this.offeredCourses = res.data;
      if (recount) {
        this.api.getCourseCount(this.schoolId, searchQuery, grade, disciplines).subscribe((res: any) => {
          this.maxPage = Math.max(Math.ceil(res.data / 10), 1);
        })
      }
    })
  }

  getRecommendedCourses() {
    const user = JSON.parse(this.cookie.get('userObject'));
    let userID = user.userId;

    this.api.getRecommendedCourses(userID, this.schoolId).subscribe((res: any) => {
      this.courseReqs = res.data;
      
      this.courseReqs.forEach((course: any) => {
        this.recommendedCourses = this.recommendedCourses.concat(course.courseCode+ " or ")
      })
      this.recommendedCourses = this.recommendedCourses.substring(0, this.recommendedCourses.length - 4);
     })  
  }

  ngOnInit() {
    let user = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.schoolId = user.affiliationID;
    this.getCourses(true, undefined, undefined, undefined);
    this.getRecommendedCourses();
  }
}
