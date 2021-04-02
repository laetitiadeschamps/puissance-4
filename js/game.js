const game = {
    colors:[],
    players:{
        1 :{name:'', color:''},
        2: {name:'', color:''}
    },

   
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
        game.players={
            1 :{name:'', color:''},
            2: {name:'', color:''}
        };
    
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
        
        const row = targetCell.dataset.column[2];
        const col = targetCell.dataset.column[0];
        let arrays = game.createArrays(row, col, targetCell);
      if(game.checkAlignement(arrays.diag) || game.checkAlignement(arrays.row) ||game.checkAlignement(arrays.col)) {
         game.winner = game.currentPlayer;
          return true;
      }
     
      return false;
       
    },
    createArrays: function(row, col, target) {
        let rowArray=[];
        let colArray=[];
        let diagArray=[];
        
        const cells = document.querySelectorAll('.cell');
      
        for (let cell of cells) {
        
          
            if(cell.dataset.column[2] == row) {
             
                rowArray.push(cell);
                
            }
            if(cell.dataset.column[0] == col) {
              
                colArray.push(cell);
            } 
            
              
                for(let i = -8; i < 8 ;i++)  {
               col =parseInt(col);
               row = parseInt(row);
               
               
                    if((cell.dataset.column[0] == col + i && cell.dataset.column[2] == row + i) || (cell.dataset.column[0] == col - i && cell.dataset.column[2] == row - i) || (cell.dataset.column[0] == col + i && cell.dataset.column[2] == row - i) || (cell.dataset.column[0] == col - i && cell.dataset.column[2] == row + i) ) {
                        diagArray.push(cell);

                    }
                }
                
            }
            let diagSet = new Set(diagArray);
            let diag = [...diagSet];
           return  {
               'row':rowArray,
               'col':colArray,
               'diag':diag
           }
        },
    checkAlignement:function(array) {
     
            for(let i = 0; i < array.length-3; i++) {
               
                
                if(array[i].dataset.state == "player"+ game.currentPlayer && array[i+1].dataset.state == "player"+ game.currentPlayer && array[i+2].dataset.state == "player"+ game.currentPlayer && array[i+3].dataset.state == "player"+ game.currentPlayer) {
                  
                   return true;
                }
               
            }
            return false;
        }
 }