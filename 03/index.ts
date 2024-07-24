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

const leituraDoArquivo = (path: string): unknown => {
    try {
        const ler = fs.readFileSync(path, 'utf-8')
        return JSON.parse(ler);
    } catch (err) {
        return console.error(err);
    }
}

const escreverArquivo = (path: string, dados: any): void => {
    fs.writeFileSync(path, JSON.stringify(dados));
}

const listarUsuarios = (path: string): Usuario[] => {
    return leituraDoArquivo(path) as Usuario[];
}

const detalharUsuario = (path: string, cpf: string): Usuario[] | void => {
    try {
        const usuarios = listarUsuarios(path)
        const encontraUsuario = usuarios.filter((usuario) => {
            return usuario.cpf === cpf
        })
        return encontraUsuario;
    } catch (err) {
        return console.error(err)
    }

}

const atualizarUsuario = (path: string, cpf: string, atualizaDadosUsuario: Usuario,): Usuario | void => {
    try {
        let usuarios = listarUsuarios(path)
        const indexUsuario = usuarios.findIndex((usuario) => {
            return usuario.cpf === cpf;
        })
        usuarios[indexUsuario] = atualizaDadosUsuario;
        escreverArquivo(path, usuarios)
        return atualizaDadosUsuario;
    } catch (err) {
        return console.error(err)
    }
}

const usuario = {
    nome: 'Eric atualizado',
    email: 'eric@eric.com.br',
    cpf: '123123123',
    endereco: null
}

//console.log(listarUsuarios('./03/bd.json'))
//console.log(detalharUsuario('./03/bd.json', ''))
console.log(atualizarUsuario('./03/bd.json', '123123123', usuario))
