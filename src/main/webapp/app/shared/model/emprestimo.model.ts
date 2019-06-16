import { Moment } from 'moment';
import { IExemplar } from 'app/shared/model/exemplar.model';
import { IUser } from 'app/core/user/user.model';

export interface IEmprestimo {
    id?: number;
    dataEmprestimo?: Moment;
    exemplar?: IExemplar;
    user?: IUser;
}

export class Emprestimo implements IEmprestimo {
    constructor(public id?: number, public dataEmprestimo?: Moment, public exemplar?: IExemplar, public user?: IUser) {}
}
