import { Component, Input } from '@angular/core';
import { AlertService } from "../_services/alert.service";
@Component({
    //moduleId: module.id,
    selector: 'alert-dialog',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})
export class AlertComponent {
    message: any;
    constructor(
        private alertService: AlertService
    ) { }

    ngOnInit() {
        //this function waits for a message from alert service, it gets 
        //triggered when we call this from any other component
        this.alertService.getMessage().subscribe(message => {
            this.message = message;
        });
    }
}
