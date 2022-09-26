import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category, Movie, MoviesService } from '../movies.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {
  movie!: Movie;
  categories!: Category[];
  isUpdate: boolean = false;
  images!: any;
  movieForm: FormGroup;
  movieId: number = 0;
  constructor(private movieServ: MoviesService, private router: Router, private route: ActivatedRoute) {
    this.movieForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });

  }


  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      const movieID = +param['id'];
      if (movieID) {
        this.movieId = movieID;
        this.isUpdate = true;
        this.movieServ.getMovie(movieID).subscribe(res => {
          this.movie=res;
          this.images = res.image;
          this.isUpdate = true;
          this.movieForm.patchValue({ ...res, category: res.category_id, image: '' });
          this.movieForm.controls['image'].removeValidators(Validators.required);
          this.movieForm.controls['image'].updateValueAndValidity();
        })
      }
    })
    this.movieServ.getCategories().subscribe(categs => {
      this.categories = categs;
    });
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  ModifyMovie(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', this.images);
    const newMovie = { ...this.movieForm.value, category_id: this.movieForm.value.category };
    delete newMovie.image;
    delete newMovie.category;
    console.log(newMovie);
    for (const key in newMovie) {
      formData.append(key, newMovie[key]);
    }
    if (!this.isUpdate) {
      this.movieServ.addMovie(formData).subscribe((res) => {
        if (res.status == 'success') {
          this.router.navigate(['/home/movies']);
        }
      });
    }else{
      this.movieServ.updateMovie(formData,this.movieId).subscribe((res) => {
        if (res.status == 'success') {
          this.router.navigate(['/home/movies']);
        }
      });
    }
  }
}
