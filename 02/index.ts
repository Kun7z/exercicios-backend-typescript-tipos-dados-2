import * as fs from 'fs';

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null;
}

type Endereco = {
    cep: number,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

const escreverArquivo = (path: string, dados: any): void => {
    fs.writeFileSync(path, JSON.stringify(dados));
}

const leituraDoArquivo = (path: string): unknown => {
    try {
        const ler = fs.readFileSync(path, 'utf-8')
        return JSON.parse(ler);
    } catch (err) {
        return console.error(err);
    }
}

const cadastrarUsuario = (usuario: Usuario): Usuario => {
    let resultado = leituraDoArquivo('./02/bd.json') as Usuario[];
    resultado.push(usuario);
    escreverArquivo('./02/bd.json', resultado);
    return usuario;
}

const listarUsuarios = (path: string): string => {
    return leituraDoArquivo(path) as string;
}


const usuario = {
    nome: 'Eric',
    email: 'eric@eric.com.br',
    cpf: '123123123',
    endereco: null
}
console.log(cadastrarUsuario(usuario))
console.log('------------------')
console.log(listarUsuarios('02/bd.json'))