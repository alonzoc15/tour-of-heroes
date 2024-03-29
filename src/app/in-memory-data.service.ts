import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Sidekick } from './sidekick'

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ]
    const sidekicks = [
      { id: 12, name: 'Boy Wonder' },
      { id: 13, name: 'Roronoa Zoro' },
      { id: 14, name: 'Sasuke' },
      { id: 15, name: 'Falcon' },
      { id: 16, name: 'Valkyrie' },
      { id: 17, name: 'Gna' },
      { id: 18, name: 'Sengoku' },
      { id: 19, name: 'Aokiji' },
      { id: 20, name: 'Rayleigh' }
    ];
    return {heroes, sidekicks};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[], sidekicks: Sidekick[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
    return sidekicks.length > 0 ? Math.max(...sidekicks.map(sidekick => sidekick.id)) + 1 : 11;
  }
}
