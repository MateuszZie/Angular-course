import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("f") form: NgForm;

  defaulQuestion = "pet";
  answer = "";
  genders = ["male", "female"];
  defaultGender = "male";

  suggestUserName() {
    const suggestedName = "Superuser";
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: "",
    //   },
    //   secret: "teacher",
    //   questionAnswer: "lol",
    //   radio: "female",
    // });
    this.form.form.patchValue({ userData: { username: suggestedName } });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.form);
  }
}
