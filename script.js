let playerAmount = 0;
let currentIndex = 0;
let startingBalance = 0;

document.getElementById("numberConfirm").addEventListener("click", () => {
    playerAmount = parseInt(document.getElementById("playerAmountInput").value, 10);
    startingBalance = document.getElementById("balanceInput").value; // ✅ Fix here
    document.getElementById("upperSection").style.display = "none";
    document.getElementById("nameConfirmSystem").style.display = "block";
});

document.getElementById("nameConfirm").addEventListener("click", () => {
    let name = document.getElementById("playerNameInput").value.trim();

    if (currentIndex >= playerAmount) {
        alert("All names are already entered!");
        return;
    }

    if (name === "") {
        alert("Enter a name please");
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
        alert("All names are in!");
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
        alert("Cannot transfer to the same player!");
        return;
    }

    const amount = parseInt(prompt("Enter amount to transfer:"));
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount");
        return;
    }

    let balanceLabels = document.getElementsByClassName("balanceLabel");
    let fromBalance = parseInt(balanceLabels[fromIndex].textContent);
    let toBalance = parseInt(balanceLabels[toIndex].textContent);

    if (fromBalance < amount) {
        alert("Not enough money to transfer");
        return;
    }

    fromBalance -= amount;
    toBalance += amount;

    balanceLabels[fromIndex].textContent = fromBalance;
    balanceLabels[toIndex].textContent = toBalance;
});


document.getElementById("add").addEventListener("click", () => {
    const index = parseInt(document.getElementById("selectPlayer").value);
    const amount = parseInt(prompt("Enter amount to add:"));
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount");
        return;
    }

    let balanceLabels = document.getElementsByClassName("balanceLabel");
    let currentBalance = parseInt(balanceLabels[index].textContent);

    balanceLabels[index].textContent = currentBalance + amount;
});



document.getElementById("subtract").addEventListener("click", () => {
    const index = parseInt(document.getElementById("selectPlayer").value);
    const amount = parseInt(prompt("Enter amount to subtract:"));
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount");
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