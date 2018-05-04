var canvas, ctx, altura, largura, frames=0,maxPulos=3,

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
    gravidade: 1.5,
    velocidade: 0,
    forcaDoPulo: 15,
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
};





function clique(evento){
    personagem.pula();
}

function main(){
    altura = window.innerHeight;
    largura = window.innerWidth;

    if(largura >= 500){
        largura = 800;
        altura = 600;
    }

    canvas = document.createElement("canvas");
    canvas.height = altura;
    canvas.width = largura;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", clique);

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
}

function desenha(){
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, largura, altura);

    chao.desenha();
    personagem.desenha();
}

main();