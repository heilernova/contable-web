import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeAccountNodeComponent } from './tree-account-node.component';

describe('TreeAccountNodeComponent', () => {
  let component: TreeAccountNodeComponent;
  let fixture: ComponentFixture<TreeAccountNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeAccountNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeAccountNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
