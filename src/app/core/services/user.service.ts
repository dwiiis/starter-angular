import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from '../models/constants/api-routes';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
    return this.http.get(environment.baseUrl + ApiRoutes.getUsers, { params });
  }

  getUserDetail(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + ApiRoutes.getUserDetail.replace(':id', String(id)));
  }

  getUsers(event?: LazyLoadEvent) {
    const currentPage = Math.ceil((event.first + 1) / event.rows);
    let params = new HttpParams().set('page', (currentPage || 0).toString()).set('pageSize', event.rows.toString());

    if (event.sortField) {
      params = params.set('sortBy', event.sortField).set('orderBy', event.sortOrder === 1 ? 'ASC' : 'DESC');
    }
    if (event.filters) {
      for (let e in event.filters) {
        if (!this.includesNull(event?.filters[e]?.value)) {
          params = params.set(e, event?.filters[e]?.value);
        }
      }
    }

    return this.http.get<any>(environment.baseUrl + ApiRoutes.getUsers, { params: params });
  }

  includesNull(val: any) {
    const nullVal = [null, 'null', undefined, 'undefined', '', [], '00'];
    return nullVal.includes(val);
  }
}
