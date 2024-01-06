import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PageRequest } from '../utils';

@Injectable({ providedIn: 'root' })
export class ApiServices {
    constructor(
        private http: HttpClient,
    ) {
    }

    findAllService(service: string, pagination?: PageRequest): Observable<any> {
        let request: string = service;

        if (pagination?.page) {
            request += `?_page=${ pagination.page }&_limit=${ pagination.size }`;
        }

        if (pagination?.sort) {
            let [ sortBased, sortDirection ] = pagination.sort.split(',');

            request += `&_sort=${ sortBased }&_order=${ sortDirection }`;
        }

        return this.http.get<any>(request);
    }

    findByIdService(service: string, id: string): Observable<any> {
        return this.http.get<any>(service + `/${ id }`);
    }

    createOneService(service: string, body: any): Observable<any> {
        return this.http.post<any>(service, body);
    }

    updateOneService(service: string, id: any, body: any): Observable<any> {
        return this.http.put<any>(service + `/${ id }`, body ? body : null);
    }

    inactiveOneService(service: string, id: string): Observable<any> {
        return this.http.delete<any>(service + `/${ id }`);
    }

    deleteOneService(service: string, id: string): Observable<any> {
        return this.http.delete<any>(service + `/${ id }`);
    }
}
