function findTarget(array, x, y){
    for( i = 0; i < array.length ; i++) {
      var cpc = array[i];
      if(cpc.cid == x) 
          hunter = i;
      if (cpc.cid == y)
          target = i;
　  }// for
  }

  function privateRule(array, target, hunter){
      var start = Math.floor((Math.random() * 4));
      var next = start;
      var left = 0, right = 1, up = 2, down = 3;
      loop:
        while(true){
          if(next == left){
            if((hunter%column) > 0){
              swap(array, target, hunter-1);       
              return true;
            } 
          } else if (next == right) {
            if(hunter%column < (column-1) && (hunter+1) < deckSize) {
              swap(array, target, hunter+1);         
              return true;
            }
          } else if (next == up) {
            if(Math.floor(hunter/column) > 0) {
              swap(array, target, hunter -column);
              return true;
            }
          } else {
            //down
            if((hunter/column) < Math.ceil(parseFloat(deckSize)/column) && (hunter +column) < deckSize) {
              swap(array, target, hunter +column); 
              return true;
              //break loop;
            }
          }

          next = (next +1) % 4;
          if(start == next ) {
            break loop;
          }
        }// while
        return false;
  }

  function checkWomenRule(array) {
    for( i = 1; i < array.length ; i = i+2) {
      if(isTogether(array, i, i-1)) {
        return false;
      } 
　  }// for
    return true;
  }

  function womenRule(array) {
    for( i = 1; i < array.length ; i = i+2) {
      if(isTogether(array, i, i-1)) {
        modifyArray(i, array);
      }      
　  }// for
  }

  function isTogether(array, i, j){
      var cpc1 = array[i];
      var cpc2 = array[j];
      if(cpc1.sex == 1 && cpc2.sex == 1)
          return true;
      else 
        return false;
  }

  function modifyArray(index, array){
    var flag = true;
    while (flag) {
      var j = Math.floor((Math.random() * (array.length-1)));
      if(array[j].sex == 0) {
        if(j%2 == 0){
          if(array[j+1].sex == 0){
            swap(array, j, index);
            flag = false;
          }
        } else {
          if(array[j-1].sex == 0){
            swap(array, j, index);
            flag = false;
          }
        }//else
      }
    } // end while
  }

  function swap(array, i, j) {
      var temp = array[j];
　    array[j] = array[i];
　    array[i] = temp;
  }