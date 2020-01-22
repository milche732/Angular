import { Component, OnInit, OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { PolicyService, Policy, Genders } from '../_services/policy.service';
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, } from 'rxjs/operators';
import { Observable, of, from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl
} from "@angular/forms";
@Component({
    selector: 'app-policy-form',
    templateUrl: './policy-form.component.html',
    styleUrls: ['./policy-form.component.css']
})
export class PolicyFormComponent implements OnInit, OnDestroy {
    policyForm: FormGroup;
    public policyNumber: FormControl;
    public name: FormControl;
    public age: FormControl;
    public gender: FormControl;
    public policy: Policy;
    public genders = Genders;
    public success: boolean;
    private ngUnsubscribe: Subject<any> = new Subject();
    @Output() policyCreated = new EventEmitter<Policy>();
    @Output() policyUpdated = new EventEmitter<Policy>();
    constructor(private activatedRoute: ActivatedRoute, private policyService: PolicyService) {

    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        this.activatedRoute.params.subscribe(params => {
            if (params.id)
                this.loadPolicy(params.id)
        });
    }

    loadPolicy(policyNumber: number) {
        this.policyService.get(policyNumber)
            .pipe(
                takeUntil(this.ngUnsubscribe)
            ).subscribe(x => this.loadForm(x));
    }

    loadForm(x: Policy) {
        this.policy = x;
        this.policyNumber.setValue(x.policyNumber);
        this.name.setValue(x.name);
        this.age.setValue(x.age);
        this.gender.setValue(x.gender);
    }

    createFormControls() {
        this.policyNumber = new FormControl('', [
            Validators.required,
            Validators.pattern("[0-9]+")],
            this.validatePolicyNumberTaken.bind(this));
        this.name = new FormControl('', Validators.required);
        this.age = new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(120),
            Validators.pattern("[0-9]+")]);
        this.gender = new FormControl('', Validators.required);
    }

    validatePolicyNumberTaken(control: AbstractControl) {
        if (this.policy != null)
            return of(null);
        return this.policyService.check(control.value).pipe(
            map(res => { return res ? null : { policyNumberTaken: true }; }),
            catchError(() => null)
        );
    }

    createForm() {
        this.policyForm = new FormGroup({
            policyNumber: this.policyNumber,
            name: this.name,
            age: this.age,
            gender: this.gender
        });

        this.policyForm.valueChanges.subscribe(val => {
            this.success = false;
        });
    }

    onSubmitForm() {
        if (this.policyForm.valid) {
            if (this.policy == null) {
                this.policyService.create(this.policyForm.getRawValue()).subscribe(x => {
                    this.policyForm.reset();
                    this.loadForm(x);
                    this.policyCreated.emit(x);
                    this.success = true;
                });
            } else {
                this.policyService.update(this.policyForm.getRawValue()).subscribe(x => {
                    this.policyForm.reset();
                    this.loadForm(x);
                    this.policyUpdated.emit(x)
                    this.success = true;
                });
            }
        }
    }
    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
