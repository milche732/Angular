# This is a sample application written in Angular 7 in .Net Core. 

Client side is covered by 27 Tests, and server side by 13 Integration Tests
Policy Edit Form has implemented async validation on Policy # uniqueness
Solution has 3 projects:

- Catalog.Web <-PolicyController
- Catalog.Domain <- Domain models
- Catalog.Infrastructure <-PolicyRepository
- Catalog.Specification.Tests <- Integration Tests for PolicyController

Client side has following stucture:

````html
app
---\_services
-------------\policy.service.ts                   - main service class that operates with server side
-------------\policy.service.spec.ts              - 7 tests
---\header
---\pipes
---------\gender.pipe.ts                          - used to transform [0,1] to Mail, Female strings
---------\gender.pipe.spec.ts <- 2 tests
----\policy-form
----------------\policy-form.component.css
----------------\policy-form.component.html
----------------\policy-form.component.spec.ts    - 7 tests
----------------\policy-form.component.ts         - form that renders policy edit/create 
----\policy-list
                \policy-list.component.css
----------------\policy-list.component.html
----------------\policy-list.component.spec.ts    - 7 tests
----------------\policy-list.component.ts         - list of policies
---\app.config.ts                                 - some configuration related to policy service
---\app.routes.ts
````
