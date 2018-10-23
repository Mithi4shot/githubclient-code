import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnprocessableComponent } from './unprocessable/unprocessable.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '404', component: NotFoundComponent },
      { path: '403', component: ForbiddenComponent },
      { path: '422', component: UnprocessableComponent }
    ])
  ],
  declarations: [NotFoundComponent, ForbiddenComponent, UnprocessableComponent]
})
export class ErrorModule { }
