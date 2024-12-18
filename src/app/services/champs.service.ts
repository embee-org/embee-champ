import { ChampsResponse } from '@/models/interfaces/champs-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ChampsService {
  constructor(private http: HttpClient) {}

  get(): Observable<ChampsResponse> {
    return this.http.get<ChampsResponse>('/data.json');
  }
}
