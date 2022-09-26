import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, concat, map, merge, mergeMap, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesAPi = environment.testAPi + '/movies';
  private categoryAPi = environment.testAPi + '/category';

  private ImageServerDirectory = environment.testUrl;
  constructor(private httpClient: HttpClient) { }

  getMovies() {
    return this.httpClient.get<RootMoviesObject>(this.moviesAPi).pipe(
      map((res) => res.message),
      map((movies) => {
        return movies.map((movie) => {
          return this.transformMovie(movie)
        });
      })
    );
  }
  getMovie(movieID: number) {
    return this.httpClient.get<RootMovieObject>(this.moviesAPi + '/' + movieID).pipe(map(res => res.message), map(movie =>
      this.transformMovie(movie)
    ))
  }
  private transformMovie(movie: Movie) {
    return { ...movie, image: this.ImageServerDirectory + '/' + movie.image }
  }
  getCategories() {
    return this.httpClient
      .get<RootCategoryObject>(this.categoryAPi)
      .pipe(map((res) => res.message));
  }
  getEagerLoadedMoviesAndCategory() {
    return this.getCategories().pipe(
      switchMap((categories) => {
        return this.getMovies().pipe(map(movies => {
          movies= movies.map(movie => {
            const categoryName = categories.find(categ => categ.id == movie.category_id)?.name!;
            return { ...movie, category: categoryName }
          });
          return {movies,categories}
        }));
      })
    );
  }
  deleteMovie(movideID: number) {
    this.httpClient.post(this.moviesAPi + `/${movideID}`, { _method: 'delete' }).subscribe(res => { });
  }
  updateMovie(movie: FormData,movieID:number) {
    movie.append('_method','put');
    return this.httpClient.post<ModifyMovieResponse>(this.moviesAPi + `/${movieID}`, movie);
  }
  addMovie(movieData: any) {
    return this.httpClient.post<ModifyMovieResponse>(this.moviesAPi, movieData);
  }
}
interface RootMovieObject {
  status: string;
  message: Movie;
}
interface RootMoviesObject {
  status: string;
  message: Movie[];
}
interface RootCategoryObject {
  status: string;
  message: Category[];
}
interface ModifyMovieResponse {
  status: string;
  message: Movie;
}
export interface Movie {
  id: number;
  name: string;
  image: string;
  description: string;
  category_id: number;
  created_at?: string;
  updated_at?: string;
  category?: string;
}
export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
