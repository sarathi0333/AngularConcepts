/**
 * Created by SINGH on 3/13/2017.
 */
import {async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, inject} from '@angular/core/testing';

import { AppComponent } from './app.component';
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {WeatherService} from "./shared/weather.service";
import {HttpModule} from "@angular/http";


describe('TestComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true},
         WeatherService
      ],
      imports: [HttpModule],
      schemas: [ NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); this is beacuse we imported the Component Auto Detect
    de = fixture.debugElement.query(By.css('h3'));
    el = de.nativeElement;
  });

  it('should display Title as Hello Angular', () => {
    console.log("Angular "+el.textContent);
    expect(el.textContent).toContain("Hello  Angular");
  });

  it('Display City name From Weather Service', inject([WeatherService],(weatherService) => {
    weatherService.getWeatherForCity().subscribe( response => {
      console.log("Value Returned By Service "+ response.name);
      expect (response.name).toBe("London");

    });
  }));

});
