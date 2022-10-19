import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
describe("AppComponent", () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", async(() => {
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual("app");
  }));
  it("should render title in a h1 tag", async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to app!"
    );
  }));
});
