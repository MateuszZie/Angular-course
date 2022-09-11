import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbidenNames = ["Test", "test"];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenName.bind(this),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  addHobies() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

  get controls() {
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }

  forbiddenName(control: FormControl): { [s: string]: boolean } {
    if (this.forbidenNames.includes(control.value)) {
      return { usernameForbiden: true };
    }
    return null;
  }
}
