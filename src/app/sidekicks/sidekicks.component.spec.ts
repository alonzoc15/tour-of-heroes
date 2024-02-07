import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidekicksComponent } from './sidekicks.component';

describe('SidekicksComponent', () => {
  let component: SidekicksComponent;
  let fixture: ComponentFixture<SidekicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidekicksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidekicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
