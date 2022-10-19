import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserComponent } from "./user.component";

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
});
