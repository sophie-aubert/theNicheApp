import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeAchatVentePage } from './liste-achat-vente.page';

describe('ListeAchatVentePage', () => {
  let component: ListeAchatVentePage;
  let fixture: ComponentFixture<ListeAchatVentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListeAchatVentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
