import { IEditora } from 'app/shared/model/editora.model';
import { IAutor } from 'app/shared/model/autor.model';
import { IExemplar } from 'app/shared/model/exemplar.model';

export interface ILivro {
    id?: number;
    titulo?: string;
    categoria?: string;
    editora?: IEditora;
    autor?: IAutor;
    exemplars?: IExemplar[];
}

export class Livro implements ILivro {
    constructor(
        public id?: number,
        public titulo?: string,
        public categoria?: string,
        public editora?: IEditora,
        public autor?: IAutor,
        public exemplars?: IExemplar[]
    ) {}
}
