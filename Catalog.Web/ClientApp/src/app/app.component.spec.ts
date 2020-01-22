import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { Router, RouterOutlet } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.routs';

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes([])],
        declarations: [AppComponent, HeaderComponent],
        providers: [
            RouterOutlet
        ]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'ClientApp'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ClientApp");
  }));
});
