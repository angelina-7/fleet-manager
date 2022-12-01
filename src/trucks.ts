const newTruckBtn = document.querySelector('.new');

newTruckBtn.addEventListener('click', displayNewTForm);

function displayNewTForm () {
    const newTruckForm = document.getElementById('new-truck');
    newTruckForm.style.display = "block";

    newTruckBtn.parentElement.style.display = "none"
}