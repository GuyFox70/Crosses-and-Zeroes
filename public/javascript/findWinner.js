(() => {
  const field = document.querySelector('.field');
  const cells = field.querySelectorAll('.field-cell');
  const certainWinner = document.querySelector('.certain-winner');

  field.addEventListener('click', function () {

    if (findWinnerMultidimensional(getHorizontal(cells), 'xxx', '000') ||
        findWinnerMultidimensional(getVertical(cells), 'xxx', '000') ||
        findWinnerUnivariate(getDiagonalFromLeftToRight(cells), 'xxx', '000') ||
        findWinnerUnivariate(getDiagonalFromRightToFromLeft(cells), 'xxx', '000')) {

      certainWinner.classList.remove('hide');
    }
    
  });

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
})();