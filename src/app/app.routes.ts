import { Routes } from '@angular/router';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'quotation-form',
        pathMatch: 'full'
    },
    {
        path: 'quotation-form',
        component: QuotationFormComponent
    }
];
