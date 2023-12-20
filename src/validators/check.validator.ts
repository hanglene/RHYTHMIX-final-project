import { FormGroup } from "@angular/forms";

export const confirmPasswordValidator = (controlName: string, controlNameToMatch: string) => {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[controlNameToMatch];

        if (matchingControl.errors && !matchingControl.errors['confirmPasswordValidator']) {
            return;
        }

        // Kiểm tra giá trị của hai trường
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
};
