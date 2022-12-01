
const newCarBtn = document.querySelector('.new');

newCarBtn.addEventListener('click', displayNewCForm);

function displayNewCForm () {
    const newCarForm = document.getElementById('new-car');
    newCarForm.style.display = "block";

    newCarBtn.parentElement.style.display = "none"
}