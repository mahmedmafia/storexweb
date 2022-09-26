import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category, Movie, MoviesService } from './movies.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  searchName: string = '';
  categoryName='';
  modalRef!: BsModalRef;
  selectedMovie!: Movie;
  categories:Category[]=[];
  @ViewChild('template', { static: false }) tmplate!: TemplateRef<any>;
  constructor(private moviesServ: MoviesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.moviesServ.getEagerLoadedMoviesAndCategory().subscribe(res => {

      this.movies =res.movies
      this.categories=res.categories;
    });
  }

  deleteMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.modalRef = this.modalService.show(this.tmplate);

  }
  confirmDelete() {
    this.modalRef.hide();
    // this.moviesServ.deleteMovie(this.selectedMovie.id);
    this.movies = this.movies.filter(res => res.id!= this.selectedMovie.id);
  }
  onFilterCategroy(value:string){
   this.categoryName=value;
  }

}
