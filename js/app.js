const app = {
    
    init: function() {
        game.init();
      document.getElementById('before-game').addEventListener('submit', app.handleBeforeGameSubmit);
      document.getElementById('name').addEventListener('input', app.handleNameInput)
      app.displayColors();
      let headers = document.querySelectorAll('.header');
      for(let header of headers) {
        header.addEventListener('click', app.handleHeaderClick)
      }
      

    },
    handleBeforeGameSubmit: function(event) {
        event.preventDefault();
        
        app.resetErrors();
        if(app.beforeFormIsCorrect()) {
         
            game.players[game.currentPlayer].name = document.getElementById('name').value;
            game.players[game.currentPlayer].color = document.getElementById('color').value;
        if(game.currentPlayer == 1) {
            document.getElementById('submit').value = 'Démarrer la partie';
        } else if(game.currentPlayer == 2) {
         
            document.getElementById('before-game').style.display='none';
            document.getElementById('game').style.display="block";
        } 
        
        game.changeCurrentPlayer();
        document.getElementById('playerNumber').textContent = game.currentPlayer;
        app.displayColors();
       
        app.resetDisplayPlayers();
        document.getElementById('name').value = '';
       
        } 
        
      
    },
    handleNewGame:function() {

        document.querySelector('.gameOver').remove();
        document.querySelector('#grid').innerHTML = '';
        app.init();
    },
    displayColors: function(){
        const selectElement = document.querySelector('#color');
        while ( selectElement.firstChild) {
            selectElement.removeChild( selectElement.lastChild);
          }

        let option = document.createElement('option');
        option.value='';
        option.textContent = 'Veuillez sélectionner une couleur';
        document.querySelector('#color').appendChild(option);
        for(text in game.colors) {
            
            let option = document.createElement('option');
            option.value=game.colors[text];
            option.textContent = text;
            document.querySelector('#color').appendChild(option);
            option.classList.add('color');
         
            if(game.colors[text] == game.players[1].color) {
                option.disabled = true;
               
            }
        }
    },
    handleNameInput:function(event) {
       
      document.getElementById('player_name').textContent = ' ' + event.target.value;
    },
    handleHeaderClick:function(event) {
        
        const column = event.currentTarget.dataset.colIndex;
        const target = grid.defineTargetCell(column);
       if(target) {
           
       
        target.dataset.state = 'player'+ game.currentPlayer;
        let columnIndex = target.dataset.column[0]-1;
        let rowIndex = target.dataset.column[2]-1;
        grid.cells[rowIndex][columnIndex] = 'player'+ game.currentPlayer;
        
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
    resetErrors:function() {
    
        document.querySelectorAll('.error-msg').forEach(error=> error.innerHTML ="");
    },
    resetDisplayPlayers:function() {
        
        document.getElementById('playerNumber').innerHTML = game.currentPlayer;
        document.getElementById('player_name').textContent =game.players[game.currentPlayer].name;
    },
    displayMsg:function() {
        document.getElementById('message').textContent = game.msg;
    },
    beforeFormIsCorrect:function() {
      
    
        const nameElement = document.querySelector('#name');
        const colorElement = document.querySelector('#color');
        if(nameElement.value.length > 2 && colorElement.value) {
            return true;
        }
        
        if(nameElement.value.length < 2) {
            nameElement.parentNode.querySelector('.error-msg').textContent = 'veuillez rentrer plus de 2 caractères'
        }
        if(!colorElement.value) {
            colorElement.parentNode.querySelector('.error-msg').textContent = 'veuillez rentrer une couleur';
        }
        return false;
    }
    }
    document.addEventListener('DOMContentLoaded', app.init);
    