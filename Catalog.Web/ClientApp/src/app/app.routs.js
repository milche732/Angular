"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var policy_list_component_1 = require("./policy-list/policy-list.component");
var policy_form_component_1 = require("./policy-form/policy-form.component");
var wellcome_component_1 = require("./wellcome/wellcome.component");
exports.routes = [
    { path: '', redirectTo: 'wellcome', pathMatch: 'full' },
    { path: 'new', component: policy_form_component_1.PolicyFormComponent },
    { path: 'edit/:id', component: policy_form_component_1.PolicyFormComponent },
    { path: 'list', component: policy_list_component_1.PolicyListComponent },
    { path: 'wellcome', component: wellcome_component_1.WellcomeComponent }
];
//# sourceMappingURL=app.routs.js.map