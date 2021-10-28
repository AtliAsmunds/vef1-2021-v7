/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  if (bestOf % 2 === 0) {
    return false;
  }
  else if (0 < bestOf <= MAX_BEST_OF) {
    return true;
  }
  return false;
}

console.assert(isValidBestOf(1) === true, '1 er valid best of');
console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
  switch (play) {
    case '1':
      return 'Skæri';
      break;
    case '2':
      return 'Blað';
      break
    case '3':
      return 'Steinn';
      break
    default:
      return 'Óþekkt';
      break;
  }
}

console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
console.assert(playAsText('2') === 'Blað', '2 táknar blað');
console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  let p = Number(player);
  let c = Number(computer);
  if (p === c) return 0;
  else if (p === 1) {
    if (c === 2) return 1;
    return -1;
  }
  else if (p === 2) {
    if (c === 3) return 1;
    return -1;
  }
  else {
    if (c === 1) return 1;
    return -1;
  }
  // TODO útfæra
}
console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  let player = prompt('Hver er þinn leikur?\n1: Skæri\t2: Blað\t3: Steinn');
  let computer = Math.floor(Math.random() * 3 + 1);
  if (playAsText(player) !== 'Óþekkt') {
    let results = checkGame(player, computer);

    if (results > 0) {
      alert('Þú vannst þessa lotu');
      return 1;
    }
    else if (results < 0) {
      alert('Tölvan vann þessa lotu');
      return -1;
    }
    else {
      alert('Jafnt')
      return 0;
    }
  }
  else {
    alert('Ógilt val! Tölva vinnur þessa umferð');
    return -1;
  }
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  let games = prompt('Hve marga leiki viltu spila?\nVeldu oddatölu frá 1-9.');
  let playerScore = 0;
  let compScore = 0;
  if (confirm(`Viltu spila ${games} leiki?`)){
    if (isValidBestOf(games)){
      while (compScore + playerScore < games){
        let result = round();

        if (result > 0) playerScore++;
        else if (result < 0) compScore++;

        if (playerScore > games/2 || compScore > games/2) break;
      }
      if (playerScore > compScore) {
        wins++;
        alert('Til hamingju! Þú vannst!')
      }
      else {
        losses++;
        alert('Þú tapaðir, því miður :(');
      }

    }
    else console.error(`${games} er ekki leyfilegur fjöldi leikja`);
  }
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  let total = wins + losses;
  if (total > 0) {
  alert(`
  Fjöldi leikja: ${total}
  Unnir leikir: ${wins} (${(wins/total * 100).toFixed(2)}%)
  Tapaðir leikir: ${losses} (${(losses/total * 100).toFixed(2)}%)
  `)
  }
  else alert('Þú hefur spilað núll leiki')
}

// Hér getum við ekki skrifað test þar sem fallið les úr global state
