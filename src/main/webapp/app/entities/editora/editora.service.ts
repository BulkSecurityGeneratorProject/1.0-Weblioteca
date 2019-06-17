import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEditora } from 'app/shared/model/editora.model';

type EntityResponseType = HttpResponse<IEditora>;
type EntityArrayResponseType = HttpResponse<IEditora[]>;

@Injectable({ providedIn: 'root' })
export class EditoraService {
    public resourceUrl = SERVER_API_URL + 'api/editoras';

    constructor(protected http: HttpClient) {}

    create(editora: IEditora): Observable<EntityResponseType> {
        return this.http.post<IEditora>(this.resourceUrl, editora, { observe: 'response' });
    }

    update(editora: IEditora): Observable<EntityResponseType> {
        return this.http.put<IEditora>(this.resourceUrl, editora, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEditora>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEditora[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
