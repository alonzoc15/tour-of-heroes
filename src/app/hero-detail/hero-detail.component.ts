import {Component, Input} from '@angular/core';
import {Hero} from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { SidekickService } from '../sidekick.service';
import { Sidekick } from '../sidekick';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  hero: Hero | undefined;
  sidekick: Sidekick | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private sidekickService: SidekickService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getSidekick();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  getSidekick(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sidekickService.getSidekick(id)
      .subscribe(sidekick => this.sidekick = sidekick);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
