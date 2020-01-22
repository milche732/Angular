import { Component, OnInit, OnDestroy } from '@angular/core';
import { PolicyService, Policy } from '../_services/policy.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { Subject, Observable } from "rxjs";
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-policy-list',
    templateUrl: './policy-list.component.html',
    styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit, OnDestroy {
    Error: any;
    PolicyList: Policy[];
    private ngUnsubscribe: Subject<any> = new Subject();
    constructor(private policyService: PolicyService, private alertService: AlertService, private router: Router) {

    }

    deletePolicyDialog(policy: Policy) {
        let that = this;
        this.alertService.confirmThis("Are you sure you want to delete policy?", function () {
            that.deletePolicy(policy);
        }, function () {
        })
    }

    deletePolicy(policy: Policy) {
        this.policyService.delete(policy)
            .pipe(
                takeUntil(this.ngUnsubscribe)
            ).subscribe(x => {
            this.PolicyList = this.PolicyList.filter(x => x.policyNumber != policy.policyNumber);
        }, error => {
            this.Error = error;
        });
    }
    editPolicy(policy: Policy) {
        this.router.navigate(['/edit', policy.policyNumber]);
    }
    ngOnInit() {
        this.policyService.getAll().pipe(
            takeUntil(this.ngUnsubscribe)
        ).subscribe(x => {
            this.PolicyList = x;
        }, error => {
            this.Error = error;
        });
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
