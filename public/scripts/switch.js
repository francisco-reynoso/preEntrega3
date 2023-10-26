const btnSwitch = document.querySelector('#switch');
const main = document.querySelector("#main");
const tabla = document.querySelector("#tabla")

btnSwitch.addEventListener('click', () => {
	main.classList.toggle('dark');
	btnSwitch.classList.toggle('active');

});