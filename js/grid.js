const grid = {
    // We set parameters to define the grid
    nbCol : 0,
    cells:[],
    init:function() {
        // For now the number of columns is fixed, but it is totally editable through a form for instance
        grid.nbCol=7;
        grid.cells=[];
        // We create the grid structure & display the grid
        grid.initGrid()
        grid.displayGrid();
        //   We listen for clicks on a column header to place token in clicked column      
        const headers = document.querySelectorAll('.header');        
        for(let header of headers) {
            header.addEventListener('click', grid.handleHeaderClick)
        }

    },
    //Depending on column clicked, we define which cell will hold the token
    defineTargetCell:function(colIndex) {
        colIndex=parseInt(colIndex)+1;
        // We make an array of cells from the chosen column and reverse it
        let columnCells = [];
        let cells = document.querySelectorAll('.cell');
        for(let cell of cells){
            if(cell.dataset.column[0] == colIndex) {
                columnCells.push(cell); 
            }      
        };
        columnCells.reverse();
        // We return the first cell with empty status
        for (let cell of columnCells) {
        let target='';   
            if(!cell.dataset.state) {
               target = cell;
               return target;  
            }   
        }
        return '';
    },
    // Method for displaying falling token animation
    displayAnimation:function(event, target) {
        //fake div for proper animation display
        let div = document.createElement('div');
        document.querySelector('#grid').appendChild(div);
        div.classList.add('fake-anim');
        // Depending on column where the token goes, we offset the div element
        const offsetLeft = event.currentTarget.offsetLeft;
        document.querySelector('html').style.setProperty('--position-X', offsetLeft + "px");
        const width = event.currentTarget.offsetWidth;
        document.querySelector('html').style.setProperty('--width', width + "px");
        // The animated token will be of the color of the token put, i.e. current player
        const color=game.players[game.currentPlayer].color;
        document.querySelector('html').style.setProperty('--color-player', color);
        const height = grid.getCellHeight();
        const distanceY= grid.getOffsetY(target);
        const animationY = distanceY - div.offsetTop;
        document.querySelector('html').style.setProperty('--height', height+ 'px');
        document.querySelector('html').style.setProperty('--heightY', animationY+ 'px');
        let divEl = document.createElement('div');
        document.querySelector('#grid').appendChild(divEl);
        divEl.classList.add('animation');
        //At the end of the animation, we remove both animation div and fake div
        setTimeout(()=> {
            div.remove();
            divEl.remove();
        }, 300) 
    },
    //Method for displaying when someone has won    
    displayGameOver:function() {
        let divElement = document.createElement('div');
        document.querySelector('#grid').appendChild(divElement);
        divElement.classList.add('gameOver');
        divElement.innerHTML = `<p>Fin du jeu, le joueur ${game.winner} : ${game.players[game.winner].name} a gagné ! </p> `;
        let button = document.createElement('button');
        button.textContent = 'Recommencer une nouvelle partie';
        button.id='newGame';
        divElement.appendChild(button);
        document.querySelector('html').style.setProperty('--color-player-winner', game.players[game.winner].color);
        document.querySelector('#newGame').addEventListener('click', app.handleNewGame)   
    },
    // Method for displaying the grid
    displayGrid:function() {
        let letters = 'abcdefghijklmnopqrstuvw';
        for(let col = 0; col < grid.nbCol; col++) {
            let divElement = document.createElement('div');
            document.querySelector('#grid').appendChild(divElement);
            divElement.classList.add('header');
            divElement.dataset.colIndex = col; 
            divElement.textContent=letters[col].toUpperCase();
        }
        for(let row = 1; row <= grid.nbCol; row++) {
            for(let col= 1; col <= grid.nbCol; col++) {
                let divElement = document.createElement('div');
                document.querySelector('#grid').appendChild(divElement);
                divElement.classList.add('cell');
                divElement.dataset.column = col+':'+row;    
            }    
        }
    },
    // On each click on a column header, we launch a new turn
    handleHeaderClick:function(event) {
        // We retrieve column clicked, and define target cell accordingly
        const column = event.currentTarget.dataset.colIndex;
        const target = grid.defineTargetCell(column);
        // If there is a target cell(i.e. there is still empty cells left on the column)
        if(target) {
            // We update our grid so that the cell contains info on player number for the token
            target.dataset.state = 'player'+ game.currentPlayer;
            let columnIndex = target.dataset.column[0]-1;
            let rowIndex = target.dataset.column[2]-1;
            grid.cells[rowIndex][columnIndex] = 'player'+ game.currentPlayer;
            // We launch the falling token animation and fire the checkgameover action afterwards
            setTimeout(()=> {
                target.style.backgroundColor=game.players[game.currentPlayer].color;
                if(!game.checkGameOver(target)) {
                    game.changeCurrentPlayer();
                    app.resetDisplayPlayers();
                } else {
                    grid.displayGameOver();
                }
            
            }, 300);
            grid.displayAnimation(event, target);  
        
       } else {
           game.msg = 'la colonne est déjà remplie';     
       }   
    },
 
    getCellHeight:function() {
        return document.querySelector('.cell').offsetHeight;
    },
    getOffsetY:function(target) {
        return target.offsetTop; 
    },
    // Method for creating the grid 
    initGrid:function(){
        for (let row = 0; row < grid.nbCol; row++) {
            grid.cells.push([]);
            for(let col = 0; col< grid.nbCol; col++) {
                grid.cells[row].push('');
            } 
        } 
    }
}
