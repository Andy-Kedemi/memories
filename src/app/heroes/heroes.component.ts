import { Component, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes = signal<Hero[]>([]);

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => this.heroes.set(heroes));
  }

  add(name: string): void {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    this.heroService
      .addHero({ name: trimmedName })
      .subscribe((hero) => this.heroes.update((heroes) => [...heroes, hero]));
  }

  delete(hero: Hero): void {
    this.heroes.update((heroes) => heroes.filter((item) => item !== hero));
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
