import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { provideRouter } from '@angular/router';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should open the post form when createPost is called', () => {
    // verifica che la search bar esista
    const searchBar= fixture.nativeElement.querySelector('.search-input');
    expect(searchBar).toBeTruthy();


    //verificare che il new btn esista
    const newButton = fixture.nativeElement.querySelector('.new-btn');
    expect(newButton).toBeTruthy();


    //verificare che al click di new-btn succeda qualcosa

    expect(component.isOpen()).toBeFalse();
     component.createPost()
     fixture.detectChanges()
    expect(component.isOpen()).toBeTrue()
  })
});
