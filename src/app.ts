import './style.css';

const container = document.querySelector('.container') as HTMLDivElement;
const seats = document.querySelectorAll<HTMLDivElement>(
  '.row' + ' .seat:not(occupied)'
);
const count = document.getElementById('count') as HTMLSpanElement;
const total = document.getElementById('total') as HTMLSpanElement;
const movieSelect = document.getElementById('movie') as HTMLSelectElement;
let ticketPrice = +movieSelect.value;

const setMovieData = (index: number, price: string) => {
  localStorage.setItem('selectedMovieIndex', index.toString());
  localStorage.setItem('selectedMoviePrice', price);
};

const populateUI = () => {
  const selectedSeats = JSON.parse(
    localStorage.getItem('selectedSeats')!
  ) as number[];

  if (selectedSeats.length > 0) {
    seats.forEach((seat, idx) => {
      if (selectedSeats.indexOf(idx) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex) {
    movieSelect.selectedIndex = +selectedMovieIndex;
  }
};

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll<HTMLDivElement>(
    '.row .seat.selected'
  );
  const seatsIndex = Array.from(selectedSeats).map(seat =>
    Array.from(seats).indexOf(seat)
  );

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeats.length.toString();
  total.innerText = (selectedSeats.length * ticketPrice).toString();
};

movieSelect.addEventListener('change', e => {
  const target = e.target as HTMLSelectElement;
  ticketPrice = +target.value;

  setMovieData(target.selectedIndex, target.value);
  updateSelectedCount();
});

container.addEventListener('click', e => {
  const target = e.target as HTMLDivElement;

  if (
    target.classList.contains('seat') &&
    !target.classList.contains('occupied')
  ) {
    target.classList.toggle('selected');
    updateSelectedCount();
  }
});

populateUI();
updateSelectedCount();
