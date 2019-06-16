import { ILivro } from 'app/shared/model/livro.model';

export interface IEditora {
    id?: number;
    nome?: string;
    livro?: ILivro;
}

export class Editora implements IEditora {
    constructor(public id?: number, public nome?: string, public livro?: ILivro) {}
}
