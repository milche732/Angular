import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { PolicyService, Policy } from './policy.service';

describe('PolicyService', () => {
    let policyService: PolicyService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PolicyService]
        });
        policyService = TestBed.get(PolicyService);
        httpMock = TestBed.get(HttpTestingController);
    }
    );

    it('should be created', () => {
        const service: PolicyService = TestBed.get(PolicyService);
        expect(service).toBeTruthy();
    });

    it('should result all items by calling getAll ', () => {
        const testData: Policy[] = [new Policy(1, "A", 1, 1), new Policy(2, "B", 1, 1)]; 
        // We call the service
        policyService.getAll().subscribe(data => {
            expect(data.length).toBe(2);
            expect(data).toEqual(testData);
        });

        const request = httpMock.expectOne(`${policyService.baseUrl}`);
        expect(request.request.method).toBe("GET");
        request.flush(testData);
        httpMock.verify();// Then we set the fake data to be returned by the mock
    });

    it('should 1 item by calling get', () => {
        const testData: Policy = new Policy(1, "A", 1, 1);
        // We call the service
        policyService.get(1).subscribe(data => {
            expect(data).toEqual(testData);
        });

        const request = httpMock.expectOne(`${policyService.baseUrl}/1`);
        expect(request.request.method).toBe("GET");
        request.flush(testData);
        httpMock.verify();// Then we set the fake data to be returned by the mock
    });

    it('should check', () => {
        const testData = true;
        // We call the service
        policyService.check(1).subscribe(data => {
            expect(data).toEqual(testData);
        });

        const request = httpMock.expectOne(`${policyService.baseUrl}/check/1`);
        expect(request.request.method).toBe("GET");
        request.event(new HttpResponse<boolean>({ body: true }));
        httpMock.verify();// Then we set the fake data to be returned by the mock
    });

    it('should create', () => {
        const testData: Policy = new Policy(1, "A", 1, 1);
        // We call the service
        policyService.create(testData).subscribe(data => {
            expect(data).toEqual(testData);
        });

        const request = httpMock.expectOne(`${policyService.baseUrl}`);
        expect(request.request.method).toBe("PUT");
        request.flush(testData);
        httpMock.verify();// Then we set the fake data to be returned by the mock
    });

    it('should update', () => {
        const testData: Policy = new Policy(1, "A", 1, 1);
        // We call the service
        policyService.update(testData).subscribe(data => {
            expect(data).toEqual(testData);
        });

        const request = httpMock.expectOne(`${policyService.baseUrl}`);
        expect(request.request.method).toBe("POST");
        request.flush(testData);
        httpMock.verify();// Then we set the fake data to be returned by the mock
    });

    it('should delete', () => {
        const testData: Policy = new Policy(1, "A", 1, 1);
        // We call the service
        policyService.delete(testData).subscribe(data => {
            expect(data).toEqual(true);
        });

        const request = httpMock.expectOne(`${policyService.baseUrl}/${testData.policyNumber}`);
        expect(request.request.method).toBe("DELETE");
        request.event(new HttpResponse<boolean>({ body: true }));
        httpMock.verify();// Then we set the fake data to be returned by the mock
    });
});
