import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { routes } from './app.routs';
import { ReactiveFormsModule } from '@angular/forms';
import { GenderPipe } from './pipes/gender.pipe';
import { AlertService} from './_services/alert.service'
import { PolicyService } from './_services/policy.service';
import { WellcomeComponent } from './wellcome/wellcome.component';
@NgModule({
    declarations: [AppComponent, AlertComponent, PolicyListComponent, PolicyFormComponent, HeaderComponent, GenderPipe, WellcomeComponent],
    imports: [HttpClientModule, BrowserModule, RouterModule.forRoot(routes, { useHash: true }), ReactiveFormsModule],
    providers: [AlertService, PolicyService],

  bootstrap: [AppComponent]
})
export class AppModule {}
