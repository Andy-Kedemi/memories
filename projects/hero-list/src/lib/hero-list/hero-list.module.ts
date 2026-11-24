import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from '../hero-list.component';
import { HeroListRoutingModule } from './hero-list-routing.module';

@NgModule({
  imports: [CommonModule, HeroListComponent, HeroListRoutingModule],
})
export class HeroListModule {}
