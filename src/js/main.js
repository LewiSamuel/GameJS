var canvas, ctx, altura, largura, frames=0,maxPulos=3, velocidade=6,
estadoAtual,

estados ={
    jogar:0,
    jogando:1,
    perdeu:2
},

chao = {
    y: 550,
    altura: 50,
    cor: "#ffdf70",

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(0, this.y, largura, this.altura);
    }
},

personagem = {
    x: 50,
    y: 0,
    altura: 50,
    largura: 50,
    cor: "#ff4e4e",
    gravidade: 1.6,
    velocidade: 0,
    forcaDoPulo: 23.6,
    qntPulos: 0,

    atualiza: function(){
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        if(this.y > chao.y - this.altura){
            this.y = chao.y - this.altura;
            this.qntPulos = 0;
        }
    },

    pula: function(){
        if(this.qntPulos < maxPulos){
            this.velocidade = -this.forcaDoPulo;
            this.qntPulos++;
        }
    },

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
},

obstaculos = {
    _obs: [],
    cores: ["#7777FF", "#4444FF"],
    tempoInsere: 0,

    insere: function(){
        this._obs.push({
            x: largura,
            largura: 30 + Math.floor(Math.random() * 21),
            altura: 30 + Math.floor(120 * Math.random()),
            cor: this.cores[Math.floor(2 * Math.random())]
        });

        this.tempoInsere = 35 + Math.floor(Math.random() + 21);
    },

    atualiza: function(){

        if(this.tempoInsere == 0){
            this.insere();
        }else{
            this.tempoInsere--;
        }

        for(var i=0, tam = this._obs.length; i<tam; i++){
            var obs = this._obs[i];

            obs.x -= velocidade;

            if(personagem.x < obs.x + obs.largura
            && personagem.x + personagem.largura >= obs.x
            && personagem.y + personagem.altura >= chao.y - obs.altura){

                estadoAtual = estados.perdeu;

            }else if(obs.x < -obs.largura){
                this._obs.splice(i, 1);
                tam--;
                i--;
            }
        }
    },

    limpa: function(){
        this._obs = [];
    },

    desenha: function(){
        for(var i=0, tam = this._obs.length; i<tam; i++){
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x, chao.y-obs.altura, obs.largura, obs.altura);
        }
    }
};





function clique(evento){

    if(estadoAtual == estados.jogando)
        personagem.pula();

    else if(estadoAtual == estados.jogar)
        estadoAtual = estados.jogando;

    else if(estadoAtual == estados.perdeu)
        estadoAtual = estados.jogar

}

function main(){
    altura = window.innerHeight;
    largura = window.innerWidth;

    if(largura >= 500){
        largura = 600;
        altura = 600;
    }

    canvas = document.createElement("canvas");
    canvas.height = altura;
    canvas.width = largura;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", clique);


    estadoAtual = estados.jogar;
    roda();
}

function roda(){
    atualiza();
    desenha();

    window.requestAnimationFrame(roda);
}

function atualiza(){
    frames++;

    personagem.atualiza();

    if(estadoAtual == estados.jogando){
        obstaculos.atualiza();
    }
}

function desenha(){

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, largura, altura);

    if(estadoAtual == estados.jogar){
        ctx.fillStyle = "green";
        ctx.fillRect(largura/2 -50, altura/2 -50, 100, 100);

    }else if(estadoAtual == estados.perdeu){
        ctx.fillStyle = "red";
        ctx.fillRect(largura/2 -50, altura/2 -50, 100, 100);

    }else if(estadoAtual ==  estados.jogando){
        obstaculos.desenha();      
    }
    
    chao.desenha();
    personagem.desenha();  
}

main();