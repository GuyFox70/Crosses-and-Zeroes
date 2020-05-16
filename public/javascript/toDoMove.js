(() => {
  const field = document.querySelector('.field');
  const cells = field.querySelectorAll('.field-cell');
  const buttonAgain = document.querySelector('.button-again');
  const certainWinner = document.querySelector('.certain-winner');

  const cross = 'x';
  const zero = '0';

  let note = 0;

  for (let cell of cells) {

    cell.addEventListener('click', function() {
      
      if (this.innerHTML == '') {
        note++;

        if (note == 1) {
          this.innerHTML = cross;
          this.setAttribute('data-note', cross);
        } else if (note == 2) {
          this.innerHTML = zero;
          this.setAttribute('data-note', zero);
          note = 0;
        }
       
      }

    });

  }

  buttonAgain.addEventListener('click', () => {
    certainWinner.classList.add('hide');

    for (let cell of cells) {
      cell.innerHTML = '';
      cell.removeAttribute('data-note');
    }
    note = 0;
  })
})();