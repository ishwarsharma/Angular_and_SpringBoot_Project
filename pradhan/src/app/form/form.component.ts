import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormService } from './formservice.component';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('successMessage') successMessage!: ElementRef;

  formGroup: FormGroup;
  showSuccessMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, this.nameValidator]],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      accommodationType: ['', Validators.required]
    });
  }

  ngOnInit() { }

  submitForm() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.formService.submitForm(this.formGroup.value).subscribe(
        (response: any) => {
          console.log('Form submitted successfully');

          // Display the success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Form submitted successfully! We will contact you shortly for confirmation.'
          });

          // Optionally, you can reset the form or perform other actions
          this.showSuccessMessage = true;

        },
        (error: any) => {
          console.error('Error submitting form:', error);

          // Form is invalid, show SweetAlert2 alert with validation error message
          this.showValidationErrorAlert();
        }
      );
    } else {
      // Form is invalid, show SweetAlert2 alert with validation error message
      this.showValidationErrorAlert();
    }
  }

  private showValidationErrorAlert() {
    const invalidFields = this.getInvalidFields();
    const errorText = `Please check the following fields for errors: ${invalidFields.join(', ')}`;

    Swal.fire({
      icon: 'error',
      title: 'Invalid Form',
      text: errorText
    });
  }

  private getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.formGroup.controls).forEach((controlName) => {
      const control = this.formGroup.get(controlName);
      if (control && control.invalid) {
        invalidFields.push(controlName);
      }
    });
    return invalidFields;
  }

  // Custom validator for name (only alphabets)
  private nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(control.value) ? null : { 'invalidName': true };
  }

  // Custom validator for phone number (exactly 10 digits)
  private phoneNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^\d{10}$/;
    return regex.test(control.value) ? null : { 'invalidPhoneNumber': true };
  }
}
