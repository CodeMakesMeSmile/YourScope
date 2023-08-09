import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/services/api.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})

export class AdminCoursesComponent {
  courses = <any> [];
  popup: boolean = false; 
  confirm: boolean = false;
  selected: any = {};
  currentPage: number = 1;
  totalPages: number = 0;
  filter: Filter = {
    query: undefined,
    grade: undefined,
    disciplines: undefined
  };
  disciplineSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'label',
    allowSearchFilter: true,
    enableCheckAll: false,
  };
  gradeSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'label',
    enableCheckAll: false,
  };
  selectedDisciplines: any[] = [];
  selectedGrade: any[] = [];
  disciplines = [
    { id: 1, label: "Alternative Studies" },
    { id: 2, label: "Arts" },
    { id: 3, label: "Business Studies" },
    { id: 4, label: "Canadian and World Studies" },
    { id: 5, label: "Civics/Career Studies" },
    { id: 6, label: "Classical and International Languages" },
    { id: 7, label: "Computer Studies" },
    { id: 8, label: "Cooperative Education" },
    { id: 9, label: "Dual Credit" },
    { id: 10, label: "English" },
    { id: 11, label: "English as a Second Language" },
    { id: 12, label: "First Nations, Métis and Inuit Studies" },
    { id: 13, label: "French As A Second Language" },
    { id: 14, label: "Guidance and Career Education" },
    { id: 15, label: "Health and Physical Education" },
    { id: 16, label: "Mathematics" },
    { id: 17, label: "Online Learning Courses" },
    { id: 18, label: "Online Learning Opt-out" },
    { id: 19, label: "Personalized Alternative Studies" },
    { id: 20, label: "Science" },
    { id: 21, label: "Social Sciences and Humanities" },
    { id: 22, label: "Technological Education" },
  ];
  grades = [
    { id: 9, label: "Grade Nine" },
    { id: 10, label: "Grade Ten" },
    { id: 11, label: "Grade Eleven" },
    { id: 12, label: "Grade Twelve" },
  ];

  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.api.getCourseCount(token.affiliationID, undefined, undefined, undefined).subscribe((res: any) => {
      this.totalPages = Math.ceil(res.data / 12);
    })
    this.updatePage();
  }

  deleteCourse(e: any){
    this.selected = e;
    this.confirm = true;
  }

  confirmDeletion(result: boolean) {
    this.confirm = false;
    if (result) {
      this.api.deleteCourse(this.selected.courseId).subscribe({
        next: res => {
          this.toastr.success("Successfully deleted course.");
          this.updatePage();
        }, 
        error: err => {
          this.toastr.error("There was an internal error.");
        }
      });
    }
  }

  loadPopup(e: any) {
    this.popup = true;
    this.selected = e;
  }

  closePopup1() {
    this.popup = false;
  }

  closePopup2(t: MouseEvent) {
    if ((t.target as Element).className == "close-popup") this.popup = false;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  onPageMove(increment: boolean) {
    if (this.totalPages == 0) {
      return;
    }
    if (increment) {
      if (this.currentPage == this.totalPages) {
        return;
      }
      this.currentPage++;
    } else {
      if (this.currentPage == 1) {
        return;
      }
      this.currentPage--;
    }
    this.updatePage();
  }

  updatePage() {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.api.getCourseCount(token.affiliationID, this.filter.query, this.filter.grade, this.filter.disciplines).subscribe((res: any) => {
      this.totalPages = Math.ceil(res.data / 12);
    })
    this.api.getCourses(token.affiliationID, this.filter.query, this.filter.grade, this.filter.disciplines, (this.currentPage - 1) * 12, 12).subscribe({
      next: (res: any) => {
        this.courses = res.data
      },
      error: err => {
        this.toastr.error("There was an internal error.");
      }
    });
  }

  selectDiscipline(e: any) {
    let csv = "";
    for (let i = 0; i < this.selectedDisciplines.length; i++) {
      csv += this.selectedDisciplines[i].label + ',';
    }
    this.filter.disciplines = csv.substring(0, csv.length - 1);
    this.updatePage();
    this.currentPage = 1;
  }

  unselectDiscipline(e: any) {
    if (this.selectedDisciplines.length == 0) {
      this.filter.disciplines = undefined;
      return;
    }
    let csv = "";
    for (let i = 0; i < this.selectedDisciplines.length; i++) {
      csv += this.selectedDisciplines[i].label + ',';
    }
    this.filter.disciplines = csv.substring(0, csv.length - 1);
    this.updatePage();
    this.currentPage = 1;
  }

  selectGrade(e: any) {
    this.filter.grade = this.selectedGrade[0].id;
  }

  unselectGrade(e: any) {
    if (this.selectedGrade.length == 0) {
      this.filter.grade = undefined;
      return;
    }
    this.filter.grade = this.selectedGrade[0].id;
  }

  applyQuery() {
    if (this.filter.query == "") {
      this.filter.query = undefined;
      return;
    }
    this.updatePage();
    this.currentPage = 1;
  }
}

export class Filter {
  query: string | undefined;
  grade: number | undefined;
  disciplines: string | undefined;
}
