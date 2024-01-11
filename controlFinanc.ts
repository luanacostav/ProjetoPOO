abstract class Transacao{
    protected descricao:string;
    protected data:Date = new Date();
    protected tipoPagamento:string;
    static listaTransacoes:Transacao[] = []
    static saldo:number = 0; // total das transações
    

    constructor(descricao:string, data:Date, tipoPagamento:string){
        this.testeDesc = descricao;
        this.descricao = descricao;
        this.testeData = data;
        this.data = data;
        this.testePag = tipoPagamento;
        this.tipoPagamento = tipoPagamento;
        Transacao.listaTransacoes.push(this);
    }

    public get testeDesc():string{
        return this.descricao;
    }

    public set testeDesc(descricao:string){
        if(descricao == "" || !(descricao)){
            throw new Error("Descrição inválida");
        }
        this.descricao = descricao;
    }

    public get testeData():Date{
        return this.data;
    }

    public set testeData(data:Date){
        if(!(data instanceof Date)){
            throw new Error("Data inválida");
        }
        this.data = data;
    }

    public get testePag():string{
        return this.tipoPagamento;
    }

    public set testePag(tipoPagamento:string){
        if(tipoPagamento == "" || !(tipoPagamento)){
            throw new Error("Descrição inválida");
        }
        this.tipoPagamento = tipoPagamento;
    }

    public get valorMonetario():number{
        return Transacao.saldo;
    }

    abstract calcularValor():number;

}

class Receita extends Transacao{
    private valorReceita:number;

    constructor(descricao:string, data:Date, tipoPagamento:string, valorReceita:number){
        super(descricao, data, tipoPagamento);
        this.valorR = valorReceita;
        this.valorReceita = valorReceita;
    }


    calcularValor():number{
        return this.valorReceita;
    }

    public set valorR(receita:number){
        if(receita <= 0){
            throw new Error("Receita Inválida");
        }
        this.valorReceita = receita;
    }

    public addReceita(){
        Transacao.saldo += this.valorReceita;
        return Transacao.saldo;
    }

}

class Desepesas extends Transacao{
    private valorDespesa:number;

    constructor(descricao:string, data:Date, tipoPagamento:string, valorDespesa:number){
        super(descricao, data, tipoPagamento);
        this.valorD = valorDespesa;
        this.valorDespesa = valorDespesa;
    }

    calcularValor():number{
        return this.valorDespesa;
    }

    public set valorD(despesa:number){
        if(despesa <= 0){
            throw new Error("Despesa Inválida");
        }
        this.valorDespesa = despesa;
    }

    public retDespesa(){
        Transacao.saldo -= this.valorDespesa;
        return Transacao.saldo;
    }
}

let transacao1:any;
let transacao2:any;

try{
    transacao1 = new Receita("Comida", new Date(2023, 11, 20),"PIX", 100);
    console.log(transacao1.calcularValor());
    console.log(transacao1.addReceita());
    console.log(transacao1.valorMonetario);

    transacao2 = new Desepesas("Roupas", new Date(2023, 11, 20), "Cartão", 30);
    console.log(transacao2.calcularValor());
    console.log(transacao2.retDespesa());
    console.log(transacao2.valorMonetario);

    console.log(Transacao.listaTransacoes);

} catch(Error){
    console.error("ERRO");
}
