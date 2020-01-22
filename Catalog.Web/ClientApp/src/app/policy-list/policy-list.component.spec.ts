import { Location } from "@angular/common";
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { GenderPipe } from '../pipes/gender.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from "@angular/common/http";
import { PolicyService, Policy } from '../_services/policy.service';
import { AlertService } from '../_services/alert.service';
import { Observable, of, from } from 'rxjs';
import { PolicyFormComponent } from '../policy-form/policy-form.component';
import { AlertComponent } from '../alert/alert.component';
import { routes } from '../app.routs';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { WellcomeComponent } from '../wellcome/wellcome.component';

import { PolicyListComponent } from './policy-list.component';

describe('PolicyListComponent', () => {
    let component: PolicyListComponent;
    let fixture: ComponentFixture<PolicyListComponent>;
    let policyService: PolicyService;
    let alertService: AlertService;
    let response: Policy[];
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, ReactiveFormsModule, FormsModule, RouterTestingModule.withRoutes(routes)],
            declarations: [PolicyListComponent, WellcomeComponent, PolicyFormComponent, GenderPipe, AlertComponent],
            providers:[AlertService]
        }).compileComponents();
        response = [
            new Policy(1, "A", 1, 1),
            new Policy(2, "B", 2, 0),
            new Policy(3, "C", 2, 0)
        ];
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PolicyListComponent);
        component = fixture.componentInstance;
        policyService = fixture.debugElement.injector.get(PolicyService);
        alertService = fixture.debugElement.injector.get(AlertService);
        fixture.detectChanges();
        location = TestBed.get(Location);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch data from onInit', () => {
        spyOn(policyService, 'getAll').and.returnValue(of(response));
        component.ngOnInit();

        expect(component.PolicyList.length).toBe(3);
        expect(component.PolicyList[2].policyNumber).toBe(3);
    });

    it('should delete policy', () => {
        const policyToDelete = response[0];

        spyOn(policyService, 'getAll').and.returnValue(of(response));
        spyOn(policyService, 'delete').and.returnValue(of(null));

        component.ngOnInit();
        component.deletePolicy(policyToDelete);

        expect(component.PolicyList.filter(x => x.policyNumber == policyToDelete.policyNumber).length).toBe(0);
    });

    it('should render policy list table', () => {
        spyOn(policyService, 'getAll').and.returnValue(of(response));

        component.ngOnInit();

        fixture.detectChanges();

        const bannerElement: HTMLElement = fixture.nativeElement;
        const tbody = bannerElement.querySelector('tbody');
        const tr = tbody.querySelectorAll("tr");
        const td = tr[2].querySelectorAll("td");

        expect(tr.length).toBe(3);
        expect(td.length).toBe(4);
        expect(td[0].innerText).toEqual("C");
    });

    it('should navigate to edit', fakeAsync( () => {

        spyOn(policyService, 'getAll').and.returnValue(of(response));

        component.ngOnInit();
        component.editPolicy(response[0]);
        tick(50);
        expect(location.path()).toBe("/edit/1");
    }));

    it('should navigate edit by clicking on Edit link', fakeAsync(() => {

        spyOn(policyService, 'getAll').and.returnValue(of(response));
        component.ngOnInit();
        fixture.detectChanges();

        const bannerElement: HTMLElement = fixture.nativeElement;
        const tbody = bannerElement.querySelector('tbody');
        const tr = tbody.querySelectorAll("tr");
        const a = tr[0].querySelectorAll("a");
        a[1].click();
        tick(50);
        expect(location.path()).toBe("/edit/1");
    }));

    it('should delete by clicking on Delete link', fakeAsync(() => {
        let deletedPolicy: Policy;

       

        const confirmService = spyOn(alertService, 'confirmThis').and.callFake((x) => {
            deletedPolicy = x;
            return of(null);
        });
        spyOn(policyService, 'getAll').and.returnValue(of(response));
        component.ngOnInit();
        fixture.detectChanges();

        let rowNumber = 0;
        const bannerElement: HTMLElement = fixture.nativeElement;
        const tbody = bannerElement.querySelector('tbody');
        const tr = tbody.querySelectorAll("tr");
        const a = tr[rowNumber].querySelectorAll("a");

        a[0].click();
        expect(confirmService).toHaveBeenCalledTimes(1);
    }));
});
