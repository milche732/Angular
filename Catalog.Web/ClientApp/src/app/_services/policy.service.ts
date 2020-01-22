import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';
import { catchError, map } from 'rxjs/operators';
export interface IPolicy {
    policyNumber: number;
    name: string;
    age: number;
    gender: number;
}

export class Policy implements IPolicy {
    
    constructor(public policyNumber: number,
        public name: string,
        public age: number,
        public gender: number)
    {
    }
}

class Gender{
    constructor(public name: string, public value: number) {

    }
}

export const Genders: Gender[] = [{ name: "Male", value: 0 }, { name: "Female", value: 1 }, ]; 

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
    readonly baseUrl: string;
    constructor(private http: HttpClient) {
        this.baseUrl = `${config.baseUrl}/policy`;
    }
    getAll(): Observable<IPolicy[]>  {
        return this.http.get<IPolicy[]>(`${this.baseUrl}`);
    }

    get(id: number): Observable<IPolicy> {
        return this.http.get<IPolicy>(`${this.baseUrl}/${id}`);
    }

    check(id: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/check/${id}`);
    }

    create(policy: IPolicy): Observable<IPolicy>  {
        return this.http.put<IPolicy>(`${this.baseUrl}`, policy);
    }

    update(policy: IPolicy): Observable<IPolicy> {
        return this.http.post<IPolicy>(`${this.baseUrl}`, policy);
    }

    delete(policy: IPolicy): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseUrl}/${policy.policyNumber}`);
    }
}
