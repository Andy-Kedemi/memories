import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [NgIf, UpperCasePipe, FormsModule, ModalComponent],
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css'],
})
export class HeroDetailComponent implements OnInit {
  private currentHero: Hero | undefined;

  @Input()
  set hero(value: Hero | undefined) {
    this.currentHero = value;
    this.draftName = value?.name ?? '';
  }

  get hero(): Hero | undefined {
    return this.currentHero;
  }

  @Output() closed = new EventEmitter<void>();
  draftName = '';

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.heroService.getHero(Number(id)).subscribe((hero) => (this.hero = hero));
    }
  }

  save(): void {
    if (this.hero) {
      this.hero.name = this.draftName;
    }
  }

  goBack(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.location.back();
    } else {
      this.closed.emit();
    }
  }
}
