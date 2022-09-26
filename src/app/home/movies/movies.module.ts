import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchItemPipe } from './search-item.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NewMovieComponent } from './new-movie/new-movie.component';
const routes: Route[] = [
  { path: "", pathMatch: 'full', component: MoviesComponent },
  { path: "new", component: NewMovieComponent },
  { path: "update/:id", component: NewMovieComponent }


]


@NgModule({
  declarations: [
    MoviesComponent,
    SearchItemPipe,
    NewMovieComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule

  ]
})
export class MoviesModule { }
