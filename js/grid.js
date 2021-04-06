const grid = {
    nbCol : 0,
    cells:[],
    init:function() {
        grid.nbCol=7;
        grid.cells=[];
        grid.initGrid()
        grid.displayGrid();
      

    },
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
    initGrid:function(){

        for (let row = 0; row < grid.nbCol; row++) {
            grid.cells.push([]);
           for(let col = 0; col< grid.nbCol; col++) {
               grid.cells[row].push('');
           }
           
        }
       
        
    },
  
    
    displayAnimation:function(event, target) {
            //fake div

            let div = document.createElement('div');
            document.querySelector('#grid').appendChild(div);
            
            div.classList.add('fake-anim');
            //
            const offsetLeft = event.currentTarget.offsetLeft;
            document.querySelector('html').style.setProperty('--position-X', offsetLeft + "px");
           const width = event.currentTarget.offsetWidth;
           
           document.querySelector('html').style.setProperty('--width', width + "px");
          
          
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

            setTimeout(()=> {
                div.remove();
                divEl.remove();
            }, 300)
           
          
          
           

        //TODO
    }, 
    getCellHeight:function() {
        return document.querySelector('.cell').offsetHeight;
    },
    getOffsetY:function(target) {
        return target.offsetTop; 
    },
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
    defineTargetCell:function(colIndex) {
       
        colIndex=parseInt(colIndex)+1;
       
        let columnCells = [];
        let cells = document.querySelectorAll('.cell');
        for(let cell of cells){
            
            if(cell.dataset.column[0] == colIndex) {
                columnCells.push(cell);
               
            }
            
        };
        columnCells.reverse();
       for (let cell of columnCells) {
        let target='';   
            if(!cell.dataset.state) {
               target = cell;
               return target;  
           }   
       }
       return '';
        //Return l'élement de la rangée la plus haute qui a un state vide
}}
