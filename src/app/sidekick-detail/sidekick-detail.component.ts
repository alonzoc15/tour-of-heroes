import { Component } from '@angular/core';
import {Sidekick} from '../sidekick';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SidekickService } from '../sidekick.service';

@Component({
  selector: 'app-sidekick-detail',
  templateUrl: './sidekick-detail.component.html',
  styleUrl: './sidekick-detail.component.css'
})
export class SidekickDetailComponent {
  sidekick: Sidekick | undefined;

  constructor(
    private route: ActivatedRoute,
    private sidekickService: SidekickService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSidekick();
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
    if (this.sidekick) {
      this.sidekickService.updateSidekick(this.sidekick)
        .subscribe(() => this.goBack());
    }
  }
}
