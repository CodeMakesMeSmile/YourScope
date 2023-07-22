import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CarouselComponent,
    TruncatePipe,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    NgbCollapse,
  ],
  exports: [
    ConfirmationDialogComponent,
    CarouselComponent,
    TruncatePipe,
    NavbarComponent,
  ]
})
export class SharedModule { }
