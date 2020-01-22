import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { GenderPipe } from '../pipes/gender.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from "@angular/common/http";
import { PolicyService, Policy } from '../_services/policy.service';
import { Observable, of, from } from 'rxjs';
import { WellcomeComponent } from '../wellcome/wellcome.component';
import { PolicyFormComponent } from './policy-form.component';

describe('PolicyFormComponent', () => {
    let component: PolicyFormComponent;
    let fixture: ComponentFixture<PolicyFormComponent>;
    let policyService: PolicyService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, ReactiveFormsModule, FormsModule, RouterTestingModule.withRoutes([])],
            declarations: [PolicyFormComponent, WellcomeComponent, GenderPipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PolicyFormComponent);
        component = fixture.componentInstance;
        policyService = fixture.debugElement.injector.get(PolicyService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('name field validity', () => {
        component.ngOnInit();
        let name = component.policyForm.controls["name"];

        expect(name.valid).toBeFalsy();
        expect(name.errors.required).toBeTruthy();

        name.setValue("hello");
        expect(name.valid).toBeTruthy();
    });

    it('age field validity', () => {
        component.ngOnInit();
        let age = component.policyForm.controls["age"];

        expect(age.valid).toBeFalsy();
        expect(age.errors.required).toBeTruthy();

        age.setValue("test");
        expect(age.valid).toBeFalsy();
        expect(age.errors.pattern).toBeDefined();

        age.setValue(-1);
        expect(age.valid).toBeFalsy();
        expect(age.errors.min.min).toBe(1);

        age.setValue(140);
        expect(age.valid).toBeFalsy();
        expect(age.errors.max.max).toBe(120);

        age.setValue(100);
        expect(age.valid).toBeTruthy();
    });

    it('policy field invalidity', () => {
        component.ngOnInit();
        let policyNumber = component.policyForm.controls["policyNumber"];

        expect(policyNumber.valid).toBeFalsy();
        expect(policyNumber.errors.required).toBeTruthy();

        let check = of(true);
        spyOn(policyService, "check").and.returnValue(check);

        policyNumber.setValue(111);

        expect(policyNumber.valid).toBeTruthy();
    });

    it('policy field validity', () => {
        component.ngOnInit();
        let policyNumber = component.policyForm.controls["policyNumber"];
        
        spyOn(policyService, "check").and.returnValue(of(false));
        policyNumber.setValue(777);

        expect(policyNumber.valid).toBeFalsy();
        expect(policyNumber.errors.policyNumberTaken).toBeTruthy();
    });

    it('should create new policy', () => {
        component.ngOnInit();
        let policy: Policy;
        spyOn(policyService, "check").and.returnValue(of(true));
        const createPolicy = spyOn(policyService, "create").and.callFake((x) => {
            policy = x;
            return of(policy);
        });

        const policyNumber = component.policyForm.controls["policyNumber"];
        policyNumber.setValue("1");

        const age = component.policyForm.controls["age"];
        age.setValue(12);

        const gender = component.policyForm.controls["gender"];
        gender.setValue(0);

        const name = component.policyForm.controls["name"];
        name.setValue("Jack");

        component.onSubmitForm();
        expect(createPolicy).toHaveBeenCalledTimes(1);
    });

    it('should update policy', () => {
        component.ngOnInit();
        let policy: Policy = new Policy(1, "A", 1, 1);

        const updatePolicy = spyOn(policyService, "update").and.callFake((x) => {
            policy = x;
            return of(policy);
        });

        component.loadForm(policy);

        const name = component.policyForm.controls["name"];
        name.setValue("B");

        component.onSubmitForm();

        expect(updatePolicy).toHaveBeenCalledTimes(1);
        expect(policy.policyNumber).toBe(1);
        expect(policy.name).toBe("B");
    });
});
