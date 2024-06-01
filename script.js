const boxes = document.querySelectorAll('.box')
const button = document.querySelector('button')
const info = document.querySelector('#info')
const gridElement = document.querySelector('#grid-game')

let jogador = { turn: 'X' }

const ganhadorGrid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

let gridGame = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' }

const limparGrid = () => {
    boxes.forEach(box => {
        box.innerHTML = ''
    })

    Object.keys(gridGame).forEach((item) => {
        gridGame[item] = ''
    })
}

const alternarJogador = () => {
    jogador.turn = jogador.turn === 'X' ? 'O' : 'X'
}

function iniciarJogo() {
    jogador.turn = 'X'
    info.innerHTML = `Vez do Jogador ${jogador.turn}`
    info.removeAttribute('style') //Remove atributos inline (Restaura padrão escrito no CSS)
    info.style.display = 'block'
    button.style.display = 'none'
    gridElement.style.filter = 'none'
    limparGrid()

    boxes.forEach(box => {
        box.onclick = e => {
            if (box.innerHTML == '') {
                box.innerHTML = jogador.turn
                id = box.id.split('-')[1]
                gridGame[id] = jogador.turn

                if (!verificarGanhador()) {
                    alternarJogador()
                    info.innerHTML = `Vez do Jogador ${jogador.turn}`
                }
            }
        }
    })
}

// Verifica se houve um ganhador. Retorna true se alguém já tiver ganhado ou empatado, ou falso caso contrário
function verificarGanhador() {
    for (grid of ganhadorGrid) {
        let ganhou = true
        for (num of grid) {
            if (gridGame[num] != jogador.turn)
                ganhou = false
        }
        if (ganhou === true) {
            jogadorGanhou()
            return true
        }
    }

    gridPreenchido = Object.keys(gridGame).filter(key => gridGame[key] != '' ? true : false )

    // Todo Grid preenchido sem vitória => Empate
    if(gridPreenchido.length === 9){
        empate()
        return true
    }

    return false
}

function jogadorGanhou() {
    info.innerHTML = `Jogador ${jogador.turn} Venceu!`
    finalizarPartida()
}

function empate() {
    info.innerHTML = `Empate!`
    finalizarPartida()
}

function finalizarPartida() {
    boxes.forEach(box => {box.onclick = undefined})

    gridElement.style.filter = 'blur(4px)'

    info.style.position = 'absolute'
    info.style.fontSize = '45px'
    info.style.padding = '20px'

    button.innerHTML = 'Reiniciar'
    button.style.display = 'block'
}

button.onclick = e => iniciarJogo()