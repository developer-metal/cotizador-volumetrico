import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderResponse } from '../core/model/interface/order.interface';
import { PackageOrderService } from '../core/services/package-order.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDetailsModalComponent } from '../order-details-modal/order-details-modal.component';
import { NgxTouchKeyboardModule }  from 'ngx-touch-keyboard';

@Component({
  selector: 'app-quotation-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    NgxTouchKeyboardModule
  ],
  standalone: true,
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.css']
})
export class QuotationFormComponent {
  packageForm!: FormGroup;
  orderDetails: OrderResponse['orderDetails'] | null = null;
  loading!: boolean;
  error!: string;
  language = 'en-US';

  constructor(private fb: FormBuilder,
    @Inject(PackageOrderService) private packageService: PackageOrderService,
     private dialog: MatDialog) {
      this.packageForm = this.fb.group({
        length: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
        width: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
        height: ['', [Validators.required, Validators.min(1), Validators.max(200)]]
      });
    }

    onSubmit() {
      if (this.packageForm.valid) {
        this.loading = true;
        this.error = '';
  
        try {
          this.packageService.createPackage(this.packageForm.value).subscribe({
            next: (response) => {
              this.orderDetails = response.orderDetails;
              const dialogRef = this.dialog.open(OrderDetailsModalComponent, {
                data: this.orderDetails,
                width: '400px',
                panelClass: 'custom-modal'
              });
              dialogRef.afterClosed().subscribe(() => {
                this.resetForm();
              });
              this.loading = false;
            },
            error: (error: any) => {
              console.log(error);
              this.error = error.message || 'Error al procesar la solicitud';
              const dialogRef = this.dialog.open(OrderDetailsModalComponent, {
                data: this.orderDetails,
                 width: '400px',
                panelClass: 'custom-modal'
              });
              dialogRef.afterClosed().subscribe(() => {
                this.resetForm();
              });
              this.loading = false;
            }
          });
        } catch (error: any) {
          this.error = error?.responseError;
          const dialogRef = this.dialog.open(OrderDetailsModalComponent, {
            data:  this.error,
            width: '400px',
            panelClass: 'custom-modal'
          });
          dialogRef.afterClosed().subscribe(() => {
            this.resetForm();
          });
          this.loading = false;
        }
      }
    }
    resetForm() {
      this.packageForm.reset();
      this.orderDetails = null;
      this.error = '';
    }

    validateInput(event: KeyboardEvent): void {
      const allowedKeys = [
        'Backspace',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
        'Tab',
      ];
      if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
    
}
