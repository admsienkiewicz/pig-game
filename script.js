const firstPlayer = {
    name: document.getElementById('name-player1'),
    score: document.getElementById('score-player1'),
    currentScore: document.getElementById('curr-score-player1'),
    section: document.querySelector('.player-1'),
}
const secondPlayer = {
    name: document.getElementById('name-player2'),
    score: document.getElementById('score-player2'),
    currentScore: document.getElementById('curr-score-player2'),
    section: document.querySelector('.player-2'),
}
const dice = document.querySelector('.dice')
const newGameBtn = document.querySelector('.new-game-btn')
const rollBtn = document.querySelector('.roll-btn')
const holdBtn = document.querySelector('.hold-btn')
const message = document.querySelector('.message')

let currTurnPlayer

const changeTurns = () => {
    const players = [firstPlayer, secondPlayer]
    players.forEach((player) => {
        player.currentScore.innerHTML = 0
        player.section.classList.toggle('player-active')
    })
    currTurnPlayer = currTurnPlayer === firstPlayer ? secondPlayer : firstPlayer
    message.innerHTML = 'It is your turn Player' + (currTurnPlayer === firstPlayer ? '1️⃣' : '2️⃣')
}

const rollDice = () => {
    const rolledNumber = Math.trunc(Math.random() * 6) + 1
    dice.src = `dice-${rolledNumber}.png`
    if (rolledNumber !== 1) {
        currTurnPlayer.currentScore.innerHTML = Number(currTurnPlayer.currentScore.innerHTML) + rolledNumber
    } else {
        currTurnPlayer.currentScore.innerHTML = 0
        changeTurns()
    }
}

const holdScore = () => {
    currTurnPlayer.score.innerHTML =
        Number(currTurnPlayer.score.innerHTML) + Number(currTurnPlayer.currentScore.innerHTML)
    if (currTurnPlayer.score.innerHTML >= 100) {
        message.innerHTML = `Congrats ${currTurnPlayer.name.innerHTML}🥳🥳🥳`
        currTurnPlayer.name.innerHTML = 'WINNER'
        rollBtn.removeEventListener('click', rollDice)
        holdBtn.removeEventListener('click', holdScore)
        return
    }
    changeTurns()
}

const initGame = () => {
    currTurnPlayer = firstPlayer
    const players = [firstPlayer, secondPlayer]
    players.forEach((player, index) => {
        player.currentScore.innerHTML = 0
        player.score.innerHTML = 0
        if (
            !firstPlayer.section.classList.contains('player-active') ||
            secondPlayer.section.classList.contains('player-active')
        ) {
            player.section.classList.toggle('player-active')
        }
        player.name.innerHTML = 'PLAYER ' + (index + 1)
    })
    rollBtn.addEventListener('click', rollDice)
    holdBtn.addEventListener('click', holdScore)
    message.innerHTML = 'Start the game Player1️⃣'
}

newGameBtn.addEventListener('click', initGame)

initGame()
