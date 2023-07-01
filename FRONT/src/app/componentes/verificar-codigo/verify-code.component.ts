import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/usuario.service';

@Component({
    selector: 'app-verify-code',
    templateUrl: './verify-code.component.html',
    styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {

    newData: any = {
        email: '',
        codigo: ''
    };

    mensajeExito: boolean = false;
    mensajeError: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        protected httpClient: HttpClient,
        private router: Router) { }

    verifyForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        codigo: new FormControl('', Validators.required)
    });

    get f() {
        return this.verifyForm.controls;
    }

    onSubmit(): void {

        this.newData = {
            email: this.verifyForm.controls.email.value!,
            codigo: this.verifyForm.controls.codigo.value!
        }

        this.userService.verifyCode(this.newData).subscribe({
            next: (response) => {
                if (response.hasOwnProperty('code') && response.code === 'ExpiredCodeException' || "CodeMismatchException") {
                    console.error('Error al verificar cuenta');
                    this.mensajeError = true;
                } else {
                    console.log('Cuenta verificada con éxito!', response);
                    this.mensajeExito = true;
                }
            },
            error: (error) => {
                console.error('Error al verificar cuenta:', error);
                this.mensajeError = true;
            }
        });
    }

}
