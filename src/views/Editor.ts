export function displayAddNew(name: string) {
    const newBtn = document.querySelector('.new');
    newBtn.addEventListener('click', displayNewForm);

    function displayNewForm() {
        const newForm = document.getElementById(`new-${name}`);
        newForm.style.display = "block";

        newBtn.parentElement.style.display = "none"
    }
}
