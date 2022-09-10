import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("f") form: NgForm;
  @ViewChild("pf") pForm: NgForm;

  defaulQuestion = "pet";
  answer = "";
  genders = ["male", "female"];
  defaultGender = "male";
  user = { username: "", email: "", secret: "", question: "", gender: "" };
  submited = false;

  level = "advanced";

  options = ["basic", "advanced", "pro"];

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
    this.submited = true;
    this.user.username = this.form.value.userData.username;
    this.user.email = this.form.value.userData.email;
    this.user.secret = this.form.value.secret;
    this.user.question = this.form.value.questionAnswer;
    this.user.gender = this.form.value.radio;
    this.form.reset();
  }

  pSubimt() {
    console.log(this.pForm.value);
  }
}
