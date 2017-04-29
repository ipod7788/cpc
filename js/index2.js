function relocateRW(array, jiugongge){
    var obj = jiugongge[4], count = 0;
    obj.cid = target;
    obj.sex = 0; 
    for( i = 0; i < array.length ; i++) {
      var cpc = array[i];
      for( j = 0; j < jiugongge.length ; j++) {
        var jcpc = jiugongge[j];
        if(jcpc.cIndex == -1 && jcpc.cid == cpc.cid) {
          jcpc.cIndex = i;
          count++;
        }
      }
      if(count == 9) break;
　  }// for
  }

  function findTarget(array, cid){
    for( i = 0; i < array.length ; i++) {
      var cpc = array[i];
      if(cpc.cid == cid) return i;
　  }// for
    return -1;
  }

  function privateRule(array, jiugongge){
      var target = jiugongge[4].cIndex;
      
      if((target%12) == 0){
        //check left
        jiugongge[0].disable = 1; 
        jiugongge[3].disable = 1;
        jiugongge[6].disable = 1;
      } 
          
      if((target%12) == (column-1)) {
          //check right
        jiugongge[2].disable = 1; 
        jiugongge[5].disable = 1;
        jiugongge[8].disable = 1;        
      }
        
      if(Math.floor(target/12) ==0) {
        //check upper
        jiugongge[0].disable = 1; 
        jiugongge[1].disable = 1;
        jiugongge[2].disable = 1; 
      }
            
      if((target/12) == Math.ceil(parseFloat(deckSize)/12) || (target + column-1) >= deckSize ) {
        // check lower
        jiugongge[6].disable = 1; 
        jiugongge[7].disable = 1;
        jiugongge[8].disable = 1;
      } else if ((target +column) >= deckSize ) {
        jiugongge[7].disable = 1;
        jiugongge[8].disable = 1;
      } else if ((target +column+1) >= deckSize ) {
        jiugongge[8].disable = 1;
      }
      
      

      //swap 
      for( j = 0; j < jiugongge.length ; j++) {
        var cpc = jiugongge[j];
        if(cpc.disable == 1 || j == 4) continue;
        var change = findLocation(target, column, j);
        swap(array, cpc.cIndex, change);
      }// for

      //final check
      for( j = 0; j < jiugongge.length ; j++) {
        var cpc = jiugongge[j];
        if(cpc.disable == 1 || j == 4) continue;
        var change = findLocation(target, column, j);
        if(cpc.cid != array[change]) {
          var index = findTarget(array, cpc.cid);
          swap(array, index, change);
        }
      }         
  }

  function findLocation(target , column, index){
    var upper_left = 0, upper = 1, upper_right = 2, 
          left = 3, middle = 4, right = 5,
          lower_left = 6, lower = 7, lower_right = 8, 
          locationIndex = -1;
    switch(index) {
          case upper_left : 
            locationIndex = (target-column-1);
          break;
          case upper : 
            locationIndex = (target-column);
          break;
          case upper_right : 
            locationIndex = (target-column+1);
          break;
          case left : 
            locationIndex = (target-1);
          break;
          case right : 
            locationIndex = (target+1);
          break;
          case lower_left : 
            locationIndex = (target+column-1);
          break;
          case lower : 
            locationIndex = (target+column);
          break;
          case lower_right : 
            locationIndex = (target+column+1);
          break;
    }
    return locationIndex;
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