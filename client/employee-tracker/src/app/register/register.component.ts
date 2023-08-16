import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup; // Declare the registration form as a FormGroup

  constructor(private formBuilder: FormBuilder) {
    // Initialize the registration form using FormBuilder
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // If the form is valid, you can perform registration logic here
      const formData = this.registrationForm.value;
      console.log('Registration data:', formData);
      // Clear the form after successful registration or perform desired action
      this.registrationForm.reset();
    }
  }

}
