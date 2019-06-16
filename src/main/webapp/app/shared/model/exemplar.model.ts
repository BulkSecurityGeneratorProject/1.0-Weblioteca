import { ILivro } from 'app/shared/model/livro.model';
import { IEmprestimo } from 'app/shared/model/emprestimo.model';
import { IReserva } from 'app/shared/model/reserva.model';
import { IDevolucao } from 'app/shared/model/devolucao.model';

export interface IExemplar {
    id?: number;
    emprestado?: boolean;
    reservado?: boolean;
    livro?: ILivro;
    emprestimo?: IEmprestimo;
    reserva?: IReserva;
    devolucao?: IDevolucao;
}

export class Exemplar implements IExemplar {
    constructor(
        public id?: number,
        public emprestado?: boolean,
        public reservado?: boolean,
        public livro?: ILivro,
        public emprestimo?: IEmprestimo,
        public reserva?: IReserva,
        public devolucao?: IDevolucao
    ) {
        this.emprestado = this.emprestado || false;
        this.reservado = this.reservado || false;
    }
}
