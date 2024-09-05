const animals = ['🍎', '🍊', '🍋‍🟩', '🍋', '🍌']; // Rullan elementit
const logo = '🐾';
let balance = 100; // Aloitusraha
let lockedReels = [false, false, false, false]; // Aloitusrullan lukitustilanne
let winnings = 0; // Voittojen seuranta
let currentRound = 0;
let lockedRound = 0;

function spin() {
    // Kierroslaskuri lukitusehdon takia
    currentRound = 0;
    if (lockedRound === 0) {
      currentRound += 2;
    } else {
      currentRound++;
    }

  // panoksen asetukset
  const bet = parseInt(document.getElementById('betInput').value, 10);

  if (isNaN(bet) || bet < 1) {
    alert('Aseta panokseksi vähintään 1');
    return;
  }

  if (bet > balance) {
    alert('Rahat ei riitä, aseta pienempi panos tai hanki lisää rahaa!');
    return;
  }

  const reels = document.querySelectorAll('.reel');

  // Panoksen vähennys saldosta
  balance -= bet;
  updateBalance();

  // Elementtien valinta rullista
  reels.forEach((reel, index) => {
    if (!lockedReels[index]) {
      const symbol = getRandomSymbol();
      reel.textContent = symbol;
    }
  });
  
  updateRounds();

  // Voiton tarkistus
  const winAmount = calculateWin(reels, bet);

  balance += winAmount;
  winnings = winAmount;
  updateBalance();
  updateWinnings();

  // Lukittujen rullien resetointi
  lockedReels = [false, false, false, false];
  updateLockedrounds();
  resetLockButtons();
}

// Rullien lukitus
function toggleLock(reelIndex) {
  const lockButton = document.getElementById(`lock${reelIndex}`);
  const reel = document.getElementById(`reel${reelIndex}`);

  if (currentRound % 2 === 0) {

    if (!lockedReels[reelIndex - 1]) {
      lockedReels[reelIndex - 1] = true;
      lockedRound++;
      lockButton.disabled = true;
      lockButton.textContent = 'LUKITTU';
      reel.classList.add('locked');
      
    } else {
        alert('Pyöräytä jo!');
      }
    } else {
      alert('Et voi lukita joka kierroksella!');
    }
  }
  

function resetLockButtons() {
  for (let i = 1; i <= 4; i++) {
    const lockButton = document.getElementById(`lock${i}`);
    lockButton.disabled = false;
    lockButton.textContent = `LUKITSE`;
    lockedRound = 0;
  }
}

// Elementin haku symbolilistasta
function getRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * animals.length);
  return animals[randomIndex];
}

function calculateWin(reels, bet) {
  
  const firstSymbol = reels[0].textContent;
    const specificSymbol = '🍎'; 

  if (Array.from(reels).every((reel) => reel.textContent === firstSymbol)) {
    // Laske voitot 
    switch (firstSymbol) {
      case '🍎':
        return bet * 10;
      case '🍊':
        return bet * 6;
      case '🍋‍🟩':
        return bet * 5;
      case '🍋':
        return bet * 4;
      case '🍌':
        return bet * 3;
      default:
        return 0;
    }    
  
    // Tarkistetaan onko sateenkaari x 3 rullissa
  } else if (Array.from(reels).filter((reel) => reel.textContent === specificSymbol).length === 3) {
    switch (specificSymbol) {
      case '🍎':
        return bet * 5; 
      default:
        return 0;
    }
  } else {
    return 0; // ei voittoa
  }
  }

function updateBalance() {
  document.getElementById('balance').textContent = `SALDO: ${balance}`;
}

function updateWinnings() {
  document.getElementById('winnings').textContent = `Voitit pyöräytyksellä: ${winnings}`;
}

function updateRounds() {
  document.getElementById('rounds').textContent = ``;
}

function updateLockedrounds() {
  document.getElementById('lockedrounds').textContent = ``;
}