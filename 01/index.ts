import * as fs from 'fs';

const leituraDoArquivo = (path: string): unknown => {  //como não sei o que vou receber de leitura do arquivo, boto tipo unknown;
    try {
        const ler = fs.readFileSync(path, 'utf-8')
        return JSON.parse(ler);
    } catch (err) {
        return console.error(err);
    }
}

const escreverArquivo = (path: string, dados: any): void => { //retorna vazio
    fs.writeFileSync(path, JSON.stringify(dados));
}

