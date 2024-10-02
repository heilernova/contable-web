import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartiesHomepageComponent } from './third-parties-homepage.component';

describe('ThirdPartiesHomepageComponent', () => {
  let component: ThirdPartiesHomepageComponent;
  let fixture: ComponentFixture<ThirdPartiesHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdPartiesHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdPartiesHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
