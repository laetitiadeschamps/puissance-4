const app = { 
    init: function() {
        // Initiating game map
        game.init();
        // Handling actions on before game form
        document.getElementById('before-game').addEventListener('submit', app.handleBeforeGameSubmit);
        document.getElementById('name').addEventListener('input', app.handleNameInput)
        // Displaying colors in select element
        app.displayColors();
        
    },
    // Method for checking if before game form has been properly filled out
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
    },
    // Method for displaying select of colors, depending on which has already been picked
    displayColors: function(){
        const selectElement = document.querySelector('#color');
        //We empty the select element
        while ( selectElement.firstChild) {
            selectElement.removeChild( selectElement.lastChild);
        }
        let option = document.createElement('option');
        option.value='';
        option.textContent = 'Veuillez sélectionner une couleur';
        document.querySelector('#color').appendChild(option);
        // We create one option per entry in the colors array
        for(text in game.colors) {
            let option = document.createElement('option');
            option.value=game.colors[text];
            option.textContent = text;
            document.querySelector('#color').appendChild(option);
            option.classList.add('color');
            // If this is player 2's turn and player 1 has already picked the color, we disable it
            if(game.colors[text] == game.players[1].color) {
                option.disabled = true;  
            }
        }
    },
    handleBeforeGameSubmit: function(event) {
        event.preventDefault();
        // We empty the error field to display current errors 
        app.resetErrors();
        // We check if the form has been properly filled out
        if(app.beforeFormIsCorrect()) { 
            // If yes, we add user input into players' array 
            game.players[game.currentPlayer].name = document.getElementById('name').value;
            game.players[game.currentPlayer].color = document.getElementById('color').value;
            // If this is the first submit, we go to player 2 and change the value of the submit button
            if(game.currentPlayer == 1) {
                document.getElementById('submit').value = 'Démarrer la partie';
                //if this is player 2, we hide the form and start the game
            } else if(game.currentPlayer == 2) {
                document.getElementById('before-game').style.display='none';
                document.getElementById('game').style.display="block";
            } 
        // At each submit of the form, we change the current player number and update display
        game.changeCurrentPlayer();
        document.getElementById('playerNumber').textContent = game.currentPlayer;
        // We update the select for colors, to disable the one already picked, and we update the display as per new current user 
        app.displayColors();
        app.resetDisplayPlayers();
        document.getElementById('name').value = '';
        }    
    },
    // We display player name as per input
    handleNameInput:function(event) {
        document.getElementById('player_name').textContent = ' ' + event.target.value;
      },
    // Method for launching a new game
    handleNewGame:function() {
        document.querySelector('.gameOver').remove();
        document.querySelector('#grid').innerHTML = '';
        app.init();
    },
    // We update display to match current player
    resetDisplayPlayers:function() {
        document.getElementById('playerNumber').innerHTML = game.currentPlayer;
        document.getElementById('player_name').textContent =game.players[game.currentPlayer].name;
    },
    resetErrors:function() {
        document.querySelectorAll('.error-msg').forEach(error=> error.innerHTML ="");
    },  
}
    document.addEventListener('DOMContentLoaded', app.init);
    