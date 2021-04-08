const game = {
    colors:[],
    players:{
        1 :{name:'', color:''},
        2: {name:'', color:''}
    },
    nbTokens:0,
   
   currentPlayer:1,
   winner:'',
   msg:'',
   startTime:'',
   endTime:'',
    init:function() {
        game.colors= {
            'jaune':'yellow',
            'vert': 'green',
            'rouge' : 'red',
            'orange': 'orange',
            'rose':'#f0f'
        }
       
       game.nbTokens = 4;
        game.currentPlayer= 1;
        game.msg = '';
        game.winner = '';
        game.startTime = '';
        game.endTime = '';
        grid.init();
    },
    changeCurrentPlayer:function() {
       game.currentPlayer = (game.currentPlayer == 1 ? 2 : 1);
      
    }, 
   
    checkGameOver:function(targetCell) {
        //TODO
        
        const row = targetCell.dataset.column[2]-1;
        const col = targetCell.dataset.column[0]-1;
  
            if(game.checkHorizontal(row) || game.checkVertical(col) || game.checkDiagonal(row, col)){
            game.winner = game.currentPlayer;
            return true;
        }
        return false;

  
    },
    checkHorizontal:function(row)  {
        let compteur=0;
      
        for(let i=0; i < grid.nbCol; i++) {
           
         compteur = (grid.cells[row][i] == 'player' + game.currentPlayer) ? compteur+1 : 0;
              
              
               if(compteur >= game.nbTokens){return true;}
          
          
        }
        return false;

    },
    checkVertical:function(col) {
        let compteur=0;
      
        for(let i=0; i < grid.nbCol; i++) {
           
            compteur = (grid.cells[i][col] == 'player' + game.currentPlayer) ? compteur+1 : 0;
          
           
            if(compteur >= game.nbTokens){return true;}
       
        }
        return false;

    },
    checkDiagonal:function(row, col) {
        let compteur = 0;
      let shift = row - col;
      for (let i = Math.max(shift, 0); i < Math.min(grid.nbCol, grid.nbCol + shift); i++) {
        compteur = (grid.cells[i][i - shift] == 'player' + game.currentPlayer) ? compteur+1 : 0;
          if (compteur >= game.nbTokens) return true;
      }
          // Anti-diagonal
      compteur= 0;
      shift = row + col;
      for (let i = Math.max(shift - grid.nbCol + 1, 0); i < Math.min(grid.nbCol, shift + 1); i++) {
     
        compteur = (grid.cells[i][shift - i] == 'player' + game.currentPlayer) ? compteur+1 : 0;
        if (compteur >= game.nbTokens) return true;
      }
        return false;

    }
    
 }