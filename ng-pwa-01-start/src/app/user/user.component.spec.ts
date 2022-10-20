import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserComponent } from "./user.component";
import { UserService } from "./user.service";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
    });
  }));

  it("should create user", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it("should get user from user service", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(component.user).toEqual(service.user);
  });

  it("should display user name if login", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    let compiled = fixture.debugElement.nativeElement;
    component.loggedIn = true;
    fixture.detectChanges();
    expect(compiled.querySelector("p").textContent).toContain(
      component.user.name
    );
  });

  it("shouldn't display user name if not login", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
    let compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector("p").textContent).not.toContain(
      component.user.name
    );
  });
});
