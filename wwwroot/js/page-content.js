// Select
const clientTypeSelect = document.querySelector('.clientTypeSelect');
const spanClientTypeError = document.querySelector('.clientTypeError');

// Default fonder container
const foundersFormsBlock = document.querySelector('.foundersInfoBlock');

// Client Form block
const clientFormBlock = document.querySelector('.clientForm');
// Client Inputs
const clientNameInput = document.querySelector('.clientName');
const spanClientNameError = document.querySelector('.clientNameError');

const clientInnInput = document.querySelector('.clientINN');
const spanClientInnError = document.querySelector('.clientInnError');

const clientFoundersListInput = document.querySelector('.clientFoundersList');

// Client Buttons
const saveClientButton = document.querySelector('.saveClientButton');
const addNewFounderFormButton = document.querySelector('.addNewFounderButton');

// Client types:
const individPred = 'ИП';
const juridPerson = 'ЮрЛицо';

// Founder class
function Founder(name, inn, createdDate, updatedDate) {
    this.name = name;
    this.inn = inn;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
}

// !!! FormId is a string, index is a number

// Initialize helper values
let index = 0;
let founders = new Map();

if (clientTypeSelect.value === individPred) {
    addNewFounderFormButton.disabled = true;
}
if (clientTypeSelect.value === juridPerson && founders.size < 1) {
    saveClientButton.disabled = true;
}

addNewFounderFormButton.addEventListener('click', function () {
    createFounderForm();
});

saveClientButton.addEventListener('click', function () {
});

// Type Select event listener 
clientTypeSelect.addEventListener('change', function () {
    if (clientTypeSelect.value !== individPred) {
        addNewFounderFormButton.disabled = false;
    } else {
        deleteForms();
        founders.clear();
        index = 0;
        addNewFounderFormButton.disabled = true;
    }
});

// Removes all founder forms from element
function deleteForms() {
    while (foundersFormsBlock.firstChild) {
        foundersFormsBlock.removeChild(foundersFormsBlock.firstChild);
    }
}