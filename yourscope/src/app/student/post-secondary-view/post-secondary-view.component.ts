import { Component } from '@angular/core';
import { reload } from '@angular/fire/auth';
import { off } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'post-secondary-view',
  templateUrl: './post-secondary-view.component.html',
  styleUrls: [
    './post-secondary-view.component.scss',
    '../../admin/dashboard-admin/dashboard-admin.component.scss'
  ]
})
export class PostSecondaryViewComponent {
  // Pagination
  page: Array<number> = [1, 10];
  // UI display
  loadingComplete: boolean = true;
  programs: Array<Program> = new Array<Program>;
  universities: Array<University> = [
    {id: 1, name: 'University of Toronto'}
  ];
  // Search filters
  searchQuery: string | undefined;
  selectedUniversity: number | undefined;
  savedSearch: string | undefined;
  savedUni: number | undefined;
  count: number = 3;
  offset: number = 0;
  // Form validation.
  missingSearch: boolean = false;
  lblText: string = '';
  // Initialization
  constructor(private toastr: ToastrService, private api: APIService) { }
  async ngOnInit() {
    // Getting list of university programs
    try {
      this.universities = await this.api.getUniversityList();
    }
    catch(err) {
      console.log(err);
      this.toastr.error("An internal error occurred.");
    }
  }
  // Methods
  async searchPrograms(): Promise<void> {
    if (!this.formValidation()) return;

    this.savedSearch = this.searchQuery;
    this.savedUni = this.selectedUniversity;
    try {
      this.programs = await this.api.getProgramWithFilters(this.searchQuery!, this.selectedUniversity, this.count, this.offset);
      let totalRecords = await this.api.countProgramWithFilters(this.searchQuery!, this.selectedUniversity);
      this.page[0] = 1;
      this.page[1] = Math.ceil(totalRecords/this.count);
    }
    catch(err) {
      console.log(err);
      this.toastr.error("An internal error occurred.");
    }
  }
  formValidation(): boolean {
    // Clearing form validation from previous calls
    this.clearFormValidation();

    // Validating form
    let valid: boolean = true;

    if (!this.searchQuery) {
      valid = false;
      this.missingSearch = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required filters.";
    }

    return valid;
  }
  clearFormValidation(): void {
    this.missingSearch = false;
    this.lblText = '';
  }
  getUniversityName(id: number): string {
    let filteredList: Array<University> = this.universities.filter(uni => uni.id == id);
    if (filteredList.length < 1) return "N/A";
    return filteredList[0].name;
  }
  // Pagination
  async prevPage() {
    // Checking if on first page.
    if (this.page[0] == 1) return;
    // Moving back one page.
    this.page[0]--;
    await this.reloadOptionsPagination();
  }
  async nextPage() {
    // Checking if on last page.
    if (this.page[0] == this.page[1]) return;
    // Moving forward one page.
    this.page[0]++;
    await this.reloadOptionsPagination();
  }

  async reloadOptionsPagination() {
    this.offset = (this.page[0]-1)*this.count;
    try {
      this.programs = await this.api.getProgramWithFilters(this.searchQuery!, this.selectedUniversity, this.count, this.offset);
    }
    catch(err) {
      console.log(err);
      this.toastr.error("An internal error occurred.");
    }
  }
}

export interface Program {
  id: number;
  name: string;
  gradeRange: string;
  language: string;
  prerequisites: string;
  website: string;
  universityId: number;
}

export interface University {
  id: number;
  name: string;
}
