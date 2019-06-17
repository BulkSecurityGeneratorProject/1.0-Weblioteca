import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAutor } from 'app/shared/model/autor.model';

type EntityResponseType = HttpResponse<IAutor>;
type EntityArrayResponseType = HttpResponse<IAutor[]>;

@Injectable({ providedIn: 'root' })
export class AutorService {
    public resourceUrl = SERVER_API_URL + 'api/autors';

    constructor(protected http: HttpClient) {}

    create(autor: IAutor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(autor);
        return this.http
            .post<IAutor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(autor: IAutor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(autor);
        return this.http
            .put<IAutor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAutor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAutor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(autor: IAutor): IAutor {
        const copy: IAutor = Object.assign({}, autor, {
            dataNascimento: autor.dataNascimento != null && autor.dataNascimento.isValid() ? autor.dataNascimento.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataNascimento = res.body.dataNascimento != null ? moment(res.body.dataNascimento) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((autor: IAutor) => {
                autor.dataNascimento = autor.dataNascimento != null ? moment(autor.dataNascimento) : null;
            });
        }
        return res;
    }
}
