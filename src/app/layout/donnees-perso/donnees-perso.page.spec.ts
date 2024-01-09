import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonneesPersoPage } from './donnees-perso.page';

describe('DonneesPersoPage', () => {
  let component: DonneesPersoPage;
  let fixture: ComponentFixture<DonneesPersoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DonneesPersoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
