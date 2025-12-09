const simboli = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '🥝', '🥥', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐯', '🦁', '🐮', '🐷', '🐽', '🦓', '🦄', '🐞', '🦋', '🐛', '🦗', '🕷', '🕸', '🦂', '🦟'];
let mazzoDiGioco = []; 
let primaScelta = null; 
let secondaScelta = null; 
let bloccaClick = false; 
let carteTrovate = 0; 

function generatabella(){
    let difficoltà = document.getElementById('tabella').value;
    if(difficoltà == "facile") facile();
    else if(difficoltà == "media") media();
    else difficile();
}

function preparaMazzo(numeroTotaleCarte) {
    let numeroCoppie = numeroTotaleCarte / 2;
    let selezione = simboli.slice(0, numeroCoppie);
    
    // Creo le coppie CORRETTAMENTE
    mazzoDiGioco = [];
    for (let i = 0; i < selezione.length; i++) {
        mazzoDiGioco.push(selezione[i]);
        mazzoDiGioco.push(selezione[i]);
    }
    
    // Mischio
    for (let i = mazzoDiGioco.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [mazzoDiGioco[i], mazzoDiGioco[j]] = [mazzoDiGioco[j], mazzoDiGioco[i]];
    }
    
    primaScelta = null; secondaScelta = null; bloccaClick = false; carteTrovate = 0;
}

function facile() { preparaMazzo(16); creaTabella(4,4); }
function media() { preparaMazzo(36); creaTabella(6,6); }
function difficile() { preparaMazzo(64); creaTabella(8,8); }

function creaTabella(righe, colonne) {
    let str = "<table><caption>TABELLA</caption><tbody>";
    let contatore = 0;
    for (let r = 0; r < righe; r++) {
        str += "<tr>";
        for (let c = 0; c < colonne; c++) {
            str += `<td><button id="btn-${contatore}" onclick="Scelta(${contatore})" class="bottone"></button></td>`;
            contatore++;
        }
        str += "</tr>";
    }
    str += "</tbody></table>";
    document.getElementById("tab").innerHTML = str;
}

function Scelta(indice) {
    if (bloccaClick) return;
    let bottone = document.getElementById(`btn-${indice}`);
    
    if (bottone.classList.contains("indovinato") || bottone.classList.contains("girata")) return;
    
    bottone.innerHTML = mazzoDiGioco[indice];
    bottone.classList.add("girata");
    
    if (primaScelta === null) {
        primaScelta = {indice: indice, bottone: bottone};
    } else if (secondaScelta === null) {
        secondaScelta = {indice: indice, bottone: bottone};
        setTimeout(controllaCoppia, 800); 
    }
}

function controllaCoppia() {
    let valore1 = mazzoDiGioco[primaScelta.indice];
    let valore2 = mazzoDiGioco[secondaScelta.indice];
    
    if (valore1 === valore2) {
        primaScelta.bottone.classList.add("indovinato");
        secondaScelta.bottone.classList.add("indovinato");
        carteTrovate += 2;
        if (carteTrovate === mazzoDiGioco.length) alert("HAI VINTO! 🎉");
    } else {
        primaScelta.bottone.innerHTML = "";
        secondaScelta.bottone.innerHTML = "";
        primaScelta.bottone.classList.remove("girata");
        secondaScelta.bottone.classList.remove("girata");
    }
    resetTurno();
}

function resetTurno() {
    primaScelta = null; secondaScelta = null; bloccaClick = false;
}
