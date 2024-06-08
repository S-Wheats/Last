let date = new Date();
let currYear = date.getFullYear(),
  currMonth = date.getMonth();


const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


const currentDate = document.querySelector('.current-date');
currentDate.innerHTML = `${months[currMonth]} ${currYear}`;

const daysTag = document.querySelector('.days');



const renderCalendar = () => {
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); 
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
  let liTag = '';  

  for (let i = firstDayofMonth; i > 0; i--) 
  {
    liTag += `<li class = "inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) 
    {
      let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? 'active'
        : '';
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) 
  {
    liTag += `<li class = "inactive">${i - lastDayofMonth + 1}</li>`;
  }

	daysTag.innerHTML = liTag;
};
renderCalendar();

const prevNextIcon = document.querySelectorAll('.material-icons');

prevNextIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); 
      currMonth = date.getMonth(); 
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

let selectedDate;

const days = document.querySelectorAll('.days li');
days.forEach((day) => {
  day.addEventListener('click', (event) => {
    selectedDate = event.target.innerText;
    console.log(selectedDate);
  });
});
