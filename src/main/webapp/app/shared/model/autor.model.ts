import { Moment } from 'moment';
import { ILivro } from 'app/shared/model/livro.model';

export interface IAutor {
    id?: number;
    nome?: string;
    dataNascimento?: Moment;
    nacionalidade?: string;
    livro?: ILivro;
}

export class Autor implements IAutor {
    constructor(
        public id?: number,
        public nome?: string,
        public dataNascimento?: Moment,
        public nacionalidade?: string,
        public livro?: ILivro
    ) {}
}
