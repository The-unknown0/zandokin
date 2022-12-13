import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSettingsComponent } from './article-settings.component';

describe('ArticleSettingsComponent', () => {
  let component: ArticleSettingsComponent;
  let fixture: ComponentFixture<ArticleSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
