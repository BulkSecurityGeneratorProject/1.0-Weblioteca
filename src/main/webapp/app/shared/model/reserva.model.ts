import { Moment } from 'moment';
import { IExemplar } from 'app/shared/model/exemplar.model';
import { IUser } from 'app/core/user/user.model';

export interface IReserva {
    id?: number;
    dataReseva?: Moment;
    exemplar?: IExemplar;
    user?: IUser;
}

export class Reserva implements IReserva {
    constructor(public id?: number, public dataReseva?: Moment, public exemplar?: IExemplar, public user?: IUser) {}
}
