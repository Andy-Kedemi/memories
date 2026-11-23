import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { NgFor } from '@angular/common';
import { HeroDetailComponent } from '../hero-details/hero-details.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [NgFor, HeroDetailComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css',
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero: Hero | undefined;

  constructor(private service: HeroService) {}

  ngOnInit() {
    this.service.getHeroes().subscribe((heroes) => (this.heroes = heroes));
 }

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }
}
