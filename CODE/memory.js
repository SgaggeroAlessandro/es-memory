const simboli = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '🥝', '🥥', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐯', '🦁', '🐮', '🐷', '🐽', '🦓', '🦄', '🐞', '🦋', '🐛', '🦗', '🕷', '🕸', '🦂', '🦟'];
let mazzoDiGioco = []; 
let primaScelta = null; 
let secondaScelta = null; 
let bloccaClick = false; 
let carteTrovate = 0; 

function generatabella(){
  let difficoltà = document.getElementById('tabella').value;
 if(difficoltà == "facile"){
     facile();
 }else if(difficoltà == "media"){
    media();
 }else{
     difficile();
 }
}
function preparaMazzo(numeroTotaleCarte) {
    let numeroCoppie = numeroTotaleCarte / 2;
    let selezione = simboli.slice(0, numeroCoppie);
    
    //Si creano le copie:
    mazzoDiGioco 
    
   Math.random(mazzoDiGioco);
    primaScelta = null;
    secondaScelta = null;
    bloccaClick = false;
    carteTrovate = 0;
}
function facile() {
    preparaMazzo(16); 
    
    let str = "<caption>TABELLA</caption><tbody>";
    let contatore = 0; 

    for (let r = 0; r < 4; r++) {
        str += "<tr>";
        for (let c = 0; c < 4; c++) {
            str += `<td>
                        <button id="btn-${contatore}" onclick="Scelta(${contatore})" class="bottone"></button>
                    </td>`;
            contatore++;
        }
        str += "</tr>";
    }
    str += "</tbody>";
    document.getElementById("tab").innerHTML = str;
}
function media() {
    preparaMazzo(36); 
    let str = "<caption>TABELLA</caption><tbody>";
    let contatore = 0; 

    for (let r = 0; r < 6; r++) {
        str += "<tr>";
        for (let c = 0; c < 6; c++) {
            str += `<td>
                        <button id="btn-${contatore}" onclick="Scelta(${contatore})" class="bottone"></button>
                    </td>`;
            contatore++;
        }
        str += "</tr>";
    }
    str += "</tbody>";
    document.getElementById("tab").innerHTML = str;
}
function difficile() {
    preparaMazzo(64); 
    
    let str = "<caption>TABELLA</caption><tbody>";
    let contatore = 0; 

    for (let r = 0; r < 8; r++) {
        str += "<tr>";
        for (let c = 0; c < 8; c++) {
            str += `<td>
                        <button id="btn-${contatore}" onclick="Scelta(${contatore})" class="bottone"></button>
                    </td>`;
            contatore++;
        }
        str += "</tr>";
    }
    str += "</tbody>";
    document.getElementById("tab").innerHTML = str;
}
function Scelta(indice) {
    let bottoneCliccato = document.getElementById(`btn-${indice}`);

    //  Mostra il simbolo
    bottoneCliccato.innerHTML = mazzoDiGioco[indice];
}
function preparaMazzo(numeroTotaleCarte) {
    let numeroCoppie = numeroTotaleCarte / 2;
    // Prendo i primi "numeroCoppie" simboli
    let selezione = simboli.slice(0, numeroCoppie);

    // Creo le coppie: ogni simbolo compare 2 volte
    mazzoDiGioco = [];
    for (let s of selezione) {
        mazzoDiGioco.push(s);
        mazzoDiGioco.push(s);
    }

    // Mischio il mazzo (Fisher-Yates)
    for (let i = mazzoDiGioco.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = mazzoDiGioco[i];
        mazzoDiGioco[i] = mazzoDiGioco[j];
        mazzoDiGioco[j] = temp;
    }

    // Reset variabili di gioco
    primaScelta = null;
    secondaScelta = null;
    bloccaClick = false;
    carteTrovate = 0;
}

function controllaCoppia() {
    bloccaClick = true; 

    let valore1 = mazzoDiGioco[primaScelta.indice];
    let valore2 = mazzoDiGioco[secondaScelta.indice];

    if (valore1 === valore2) {
        primaScelta.bottone.classList.add("indovinato"); 
        secondaScelta.bottone.classList.add("indovinato");
        
        carteTrovate += 2;
        resetTurno();
        
        // Controllo vittoria
        if (carteTrovate === mazzoDiGioco.length) {
             alert("HAI VINTO!");
        }
    } else {
            primaScelta.bottone.innerHTML = ""; 
            secondaScelta.bottone.innerHTML = ""; 
            primaScelta.bottone.classList.remove("girata");
            secondaScelta.bottone.classList.remove("girata");
            resetTurno();

    }
}

function resetTurno() {
    primaScelta = null;
    secondaScelta = null;
    bloccaClick = false;
}



