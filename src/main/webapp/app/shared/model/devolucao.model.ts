import { Moment } from 'moment';
import { IExemplar } from 'app/shared/model/exemplar.model';
import { IUser } from 'app/core/user/user.model';

export interface IDevolucao {
    id?: number;
    dataDevolucao?: Moment;
    exemplar?: IExemplar;
    user?: IUser;
}

export class Devolucao implements IDevolucao {
    constructor(public id?: number, public dataDevolucao?: Moment, public exemplar?: IExemplar, public user?: IUser) {}
}
