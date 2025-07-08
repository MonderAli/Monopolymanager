let playerAmount = 0;
let currentIndex = 0;
let startingBalance = 0;
let lang = "en"
const file = window.location.pathname.split("/").pop();
if(file.includes("de")){
    lang = "de"
}
else if(file.includes("fr")){
    lang = "fr"
}
else if(file.includes("it")){
    lang = "it"
}
else if(file.includes("es")){
    lang = "es"
}
else if(file.includes("ar")){
    lang = "ar"
}
else if(file.includes("he")){
    lang = "he"
}
const translations = { 
    en: { allNamesIn: "All names are in!", allNamesAlready: "All names are already entered!", enterName: "Enter a name please", transSame: "Cannot transfer to the same player!", invalid: "Invalid amount", add: "Enter amount to add:", sub: "Enter amount to subtract", trans:"Enter amount to transfer", noTrans:"No enough money to transfer" },
    de: {allNamesIn: "Alle namen sind drin", allNamesAlready: "Alle namen sind bereits eingegeben", enterName: "Bitte einen Namen eingeben", transSame: "Übertragung an denselben Spieler nicht möglich", invalid: "Ungültiger Betrag", add: "Betrag zum Hinzufügen eingeben", sub: "Betrag zum Abziehen eingeben", trans: "Betrag zum Übertragen eingeben", noTrans: "Nicht genug Geld für die Überweisung"},
    fr: {allNamesIn: "Tous les noms sont entrés", allNamesAlready: "Tous les noms sont déjà entrés", enterName: "Veuillez entrer un nom", transSame: "Impossible de transférer au même joueur", invalid: "Montant invalide", add: "Entrez le montant à ajouter", sub: "Entrez le montant à soustraire", trans: "Entrez le montant à transférer", noTrans: "Fonds insuffisantes pour le transfert"},
    it: {allNamesIn: "Tutti i nomi sono inseriti", allNamesAlready: "Tutti i nomi sono già inseriti", enterName: "Per favore, inserisci un nome", transSame: "Impossibile trasferire allo stesso giocatore", invalid: "Importo non valido", add: "Inserisci l'importo da aggiungere  ", sub: "Inserisci l'importo da sottrarre  ", trans: "Inserisci l'importo da trasferire  ", noTrans: "Fondi insufficienti per il trasferimento"},
    es: {allNamesIn: "Todos los nombres están dentro", allNamesAlready: "Todos los nombres ya están ingresados  ", enterName: "Por favor, ingrese un nombre ", transSame: " No se puede transferir al mismo jugador", invalid: "Cantidad no válida", add: "Ingresa la cantidad a añadir", sub: " Ingresa la cantidad a restar", trans: "Ingresa la cantidad a transferir", noTrans: "No hay suficiente dinero para transferir"},
    ar: {allNamesIn: "تم إدخال جميع الأسماء", allNamesAlready: "تم إدخال جميع الأسماء بالفعل ", enterName: "الرجاء إدخال إسم", transSame: "لا يمكن النقل إلى الاعب نفسه", invalid: "مبلغ غير صالح", add: "أدخل الكمية المراد إضافتها", sub: " أدخل الكمية المراد إنقاصها", trans: "أدخل الكمية المراد نقلها", noTrans: "لا يوجد مال كافي لعملية النقل"},
    he: {allNamesIn: "כל השמות הוכנסו", allNamesAlready: "כל השמות הוכנסו כבר ", enterName: "נא להכניס שם בבקשה ", transSame: " לא ניתן להעביר לאותו שחקן", invalid: "כמות לא תקינה", add: "אנא הכנס כמות להוספה", sub: " אנא הכנס כמות להחסרה", trans: "אנא הכנס כמות להעברה", noTrans: "אין מספיק כסף לבצע העברה זאת"}

} 

document.getElementById("numberConfirm").addEventListener("click", () => {
    playerAmount = parseInt(document.getElementById("playerAmountInput").value, 10);
    startingBalance = document.getElementById("balanceInput").value; // ✅ Fix here
    document.getElementById("upperSection").style.display = "none";
    document.getElementById("nameConfirmSystem").style.display = "block";
});

document.getElementById("nameConfirm").addEventListener("click", () => {
    let name = document.getElementById("playerNameInput").value.trim();

    if (currentIndex >= playerAmount) {
        alert(translations[lang].allNamesAlready);
        return;
    }

    if (name === "") {
        alert(translations[lang].enterName);
        return;
    }

    let nameLabels = document.getElementsByClassName("nameLabel");
    let balanceLabels = document.getElementsByClassName("balanceLabel"); // ✅ Fix here

    nameLabels[currentIndex].textContent = name;
    nameLabels[currentIndex].style.display = "inline-flex";

    balanceLabels[currentIndex].textContent = startingBalance; // ✅ Fix here
    balanceLabels[currentIndex].style.display = "inline-flex";

    document.getElementById("playerNameInput").value = "";

    currentIndex++;

    if (currentIndex === playerAmount) {
        alert(translations[lang].allNamesIn);
        document.getElementById("startGame").disabled = false;
        return;
        
    }
});
// When startGame clicked, populate selects
document.getElementById("startGame").addEventListener("click", () => {
    document.getElementById("controls").style.display = "inline-block";
    document.getElementById("nameConfirmSystem").style.display = "none"

    const select = document.getElementById("selectPlayer");
    const fromSelect = document.getElementById("fromPlayer");
    const toSelect = document.getElementById("toPlayer");

    // Clear previous options
    select.innerHTML = "";
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    let nameLabels = document.getElementsByClassName("nameLabel");

    for (let i = 0; i < playerAmount; i++) {
        const playerName = nameLabels[i].textContent || `Player ${i + 1}`;

        let option1 = new Option(playerName, i);
        let option2 = new Option(playerName, i);
        let option3 = new Option(playerName, i);

        select.appendChild(option1);
        fromSelect.appendChild(option2);
        toSelect.appendChild(option3);
    }

    // Optionally disable start button now to prevent multiple clicks
    document.getElementById("startGame").disabled = true;
});



document.getElementById("transfer").addEventListener("click", () => {
    const fromIndex = parseInt(document.getElementById("fromPlayer").value);
    const toIndex = parseInt(document.getElementById("toPlayer").value);

    if (fromIndex === toIndex) {
        alert(translations[lang].transSame);
        return;
    }

    const amount = parseInt(prompt(translations[lang].trans));
    if (isNaN(amount) || amount <= 0) {
        alert(translations[lang].invalid);
        return;
    }

    let balanceLabels = document.getElementsByClassName("balanceLabel");
    let fromBalance = parseInt(balanceLabels[fromIndex].textContent);
    let toBalance = parseInt(balanceLabels[toIndex].textContent);

    if (fromBalance < amount) {
        alert(translations[lang].noTrans);
        return;
    }

    fromBalance -= amount;
    toBalance += amount;

    balanceLabels[fromIndex].textContent = fromBalance;
    balanceLabels[toIndex].textContent = toBalance;
});


document.getElementById("add").addEventListener("click", () => {
    const index = parseInt(document.getElementById("selectPlayer").value);
    const amount = parseInt(prompt(translations[lang].add));
    if (isNaN(amount) || amount <= 0) {
        alert(translations[lang].invalid);
        return;
    }

    let balanceLabels = document.getElementsByClassName("balanceLabel");
    let currentBalance = parseInt(balanceLabels[index].textContent);

    balanceLabels[index].textContent = currentBalance + amount;
});



document.getElementById("subtract").addEventListener("click", () => {
    const index = parseInt(document.getElementById("selectPlayer").value);
    const amount = parseInt(prompt(translations[lang].sub));
    if (isNaN(amount) || amount <= 0) {
        alert(translations[lang].invalid);
        return;
    }

    let balanceLabels = document.getElementsByClassName("balanceLabel");
    let currentBalance = parseInt(balanceLabels[index].textContent);

    balanceLabels[index].textContent = currentBalance - amount;
});

document.getElementById("go").addEventListener("click", () => {
    const index = parseInt(document.getElementById("selectPlayer").value);


    let balanceLabels = document.getElementsByClassName("balanceLabel");
    let currentBalance = parseInt(balanceLabels[index].textContent);

    balanceLabels[index].textContent = currentBalance + 200;
});
