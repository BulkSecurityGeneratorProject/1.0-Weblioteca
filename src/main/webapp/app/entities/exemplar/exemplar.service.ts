import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExemplar } from 'app/shared/model/exemplar.model';

type EntityResponseType = HttpResponse<IExemplar>;
type EntityArrayResponseType = HttpResponse<IExemplar[]>;

@Injectable({ providedIn: 'root' })
export class ExemplarService {
    public resourceUrl = SERVER_API_URL + 'api/exemplars';

    constructor(protected http: HttpClient) {}

    create(exemplar: IExemplar): Observable<EntityResponseType> {
        return this.http.post<IExemplar>(this.resourceUrl, exemplar, { observe: 'response' });
    }

    update(exemplar: IExemplar): Observable<EntityResponseType> {
        return this.http.put<IExemplar>(this.resourceUrl, exemplar, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IExemplar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExemplar[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
