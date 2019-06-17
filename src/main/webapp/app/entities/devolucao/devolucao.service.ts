import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDevolucao } from 'app/shared/model/devolucao.model';

type EntityResponseType = HttpResponse<IDevolucao>;
type EntityArrayResponseType = HttpResponse<IDevolucao[]>;

@Injectable({ providedIn: 'root' })
export class DevolucaoService {
    public resourceUrl = SERVER_API_URL + 'api/devolucaos';

    constructor(protected http: HttpClient) {}

    create(devolucao: IDevolucao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(devolucao);
        return this.http
            .post<IDevolucao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(devolucao: IDevolucao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(devolucao);
        return this.http
            .put<IDevolucao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDevolucao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDevolucao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(devolucao: IDevolucao): IDevolucao {
        const copy: IDevolucao = Object.assign({}, devolucao, {
            dataDevolucao:
                devolucao.dataDevolucao != null && devolucao.dataDevolucao.isValid() ? devolucao.dataDevolucao.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataDevolucao = res.body.dataDevolucao != null ? moment(res.body.dataDevolucao) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((devolucao: IDevolucao) => {
                devolucao.dataDevolucao = devolucao.dataDevolucao != null ? moment(devolucao.dataDevolucao) : null;
            });
        }
        return res;
    }
}
