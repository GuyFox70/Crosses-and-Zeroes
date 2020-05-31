(() => {
  let socket = new WebSocket("ws://localhost:2006");

  const field = document.querySelector('.field');
  const cells = field.querySelectorAll('.field-cell');
  const buttonAgain = document.querySelector('.button-again');
  const certainWinner = document.querySelector('.certain-winner');

  const cross = 'x';
  const zero = '0';

  let note;

  let gamer;

  let obj = {};
  obj.num = 0;

  for (let cell of cells) {

    cell.addEventListener('click', function() {
      
      if (!this.classList.contains('cross') && !this.classList.contains('zero') && obj.num == 0) {
        obj.num++;

        if (gamer == 'x') {
          this.classList.add('cross');
          this.setAttribute('data-note', gamer);
        } else if (gamer == '0') {
          this.classList.add('zero');
          this.setAttribute('data-note', gamer);
        }

        obj.elems = getAttribute(cells, gamer);

        socket.send(JSON.stringify(obj));

        getWinner();
       
      }

    });

  }

  buttonAgain.addEventListener('click', () => {
    certainWinner.classList.add('hide');

    for (let cell of cells) {
      cell.innerHTML = '';
      cell.removeAttribute('data-note');
      cell.classList.remove('cross');
      cell.classList.remove('zero');
    }
    note = 0;
  })

  socket.onopen = function(e) {
    // socket.send(answer.innerHTML);
  };
  
  socket.onmessage = function(event) {
    if (JSON.parse(event.data).key) {
      gamer = JSON.parse(event.data).smb;
    } else {
      obj = JSON.parse(event.data);
      setSignInCells(cells, obj.elems, gamer);
    }

    getWinner();
  };
  
  socket.onclose = function(event) {
        
  };
  
  socket.onerror = function(error) {
        
  };

  function getWinner() {
    if (findWinnerMultidimensional(getHorizontal(cells), 'xxx', '000') ||
      findWinnerMultidimensional(getVertical(cells), 'xxx', '000') ||
      findWinnerUnivariate(getDiagonalFromLeftToRight(cells), 'xxx', '000') ||
      findWinnerUnivariate(getDiagonalFromRightToFromLeft(cells), 'xxx', '000')) {

      certainWinner.classList.remove('hide');
    }
  }

  function findWinnerMultidimensional(arr, str1, str2) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].join('') == str1 || arr[i].join('') == str2) {
        return true;
      }
    }

    getHorizontal(cells, true);
  }

  function findWinnerUnivariate(arr, str1, str2) {
    if (arr.join('') == str1 || arr.join('') == str2) {
      return true;
    }
  }

  function getHorizontal(arr, cancel) {
    const horizontal = [];
    const basket = [];

    for (let i = 0; i < 3; i++) {
      horizontal[i] = [];

      for (let j = 0; j < arr.length; j++) {

        if (horizontal[i].length < 3 && basket[j] != arr[j]) {
          horizontal[i].push(arr[j].getAttribute('data-note'));
          basket.push(arr[j]);
        }
      }

    }

    if (cancel) horizontal.length = 0;

    basket.length = 0;

    return horizontal;
  }

  function getVertical(arr) {
    const vertical = [];
    let count = 0;

    for (let i = 0; i < 3; i++) {
      vertical[i] = [];
      count = i;

      for (let j = 0, k = 0; j < 3; j++, count += 3) {
        vertical[i].push(arr[count].getAttribute('data-note'));
      }

    }
    return vertical;
  }

  function getDiagonalFromLeftToRight(arr) {
    const diagonalFromLeftToRight = [];

    for (let i = 0; i < arr.length; i += 4) {
      diagonalFromLeftToRight.push(arr[i].getAttribute('data-note'));
    }
    return diagonalFromLeftToRight;
  }

  function getDiagonalFromRightToFromLeft(arr) {
    const diagonalFromRightToLeft = [];

    for (let i = 2; i < arr.length - 1; i += 2) {
      diagonalFromRightToLeft.push(arr[i].getAttribute('data-note'));
    }
    return diagonalFromRightToLeft;
  }

  function setSignInCells(arr, signs) {
    for (let i = 0; i < signs.length; i++) {
      if (signs[i] == 'x') {
        arr[i].classList.add('cross');
        arr[i].setAttribute('data-note', cross);
      } else if (signs[i] == '0') {
        arr[i].classList.add('zero');
        arr[i].setAttribute('data-note', zero);
      }
    }
  }

  function getAttribute(arr, gamer) {
    let result = [];

    for (let elem of arr) {
      if(elem.classList.contains('cross')) {
        result.push(cross);
      } else if(elem.classList.contains('zero')) {
        result.push(zero);
      } else {
        result.push('');
      }
    }

    return result;
  }
})();