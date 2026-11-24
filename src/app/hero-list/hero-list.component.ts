import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = []; // State variable to hold heroes
  loading: boolean = false; // State variable for loading status
  errorMessage = '';

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.loadHeroes(); // Load heroes on component initialization
  }

  loadHeroes() {
    this.loading = true;
    this.errorMessage = '';
    this.heroService.getHeroes().subscribe({
      next: (data: Hero[]) => {
        this.heroes = data;
      },
      error: (error: unknown) => {
        this.errorMessage =
          error instanceof Error
            ? error.message
            : 'Heroes could not be loaded. Please try again.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
