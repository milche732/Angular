import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { WellcomeComponent } from './wellcome/wellcome.component';

import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'wellcome', pathMatch:'full' },
    { path: 'new', component: PolicyFormComponent },
    { path: 'edit/:id', component: PolicyFormComponent },
    { path: 'list', component: PolicyListComponent },
    { path: 'wellcome', component: WellcomeComponent }
];
