$( document ).ready(function() {
//const testJson = '[{"name":"Fred","inn":"231231233214","createdDate":"2020-08-29T21:23:28","updatedDate":"2020-08-29T21:23:28"},{"name":"Dredd","inn":"342143124312","createdDate":"2020-08-29T21:31:28","updatedDate":"2020-08-29T21:31:28"}]';
//let array = JSON.parse(testJson);

const jsonString = clientFoundersListInput.value;
let array = JSON.parse(jsonString);

arrayToMap(array, founders);
prepareFounderForms(founders);

function arrayToMap(array, map) {
    for (let i = 0; i < array.length; i++) {
        let founder = new Founder(array[i].name, array[i].inn,
            array[i].createdDate, array[i].updatedDate);
        map.set(i.toString(), founder);
    }
}

function prepareFounderForms(foundersMap) {
    for (let i = 0; i < foundersMap.size; i++) {
        let form = createFounderForm();
        let formId = i.toString();
        populateFounderForm(formId, form);
        setButtonsForExistingFounders(form);
    }
}

// Fill forms with existing, uploaded from the server Founders
function populateFounderForm(formId, form) {
  //  const form = $('form#' + i)[0];
    const founderNameInput = form.querySelector('.founderFullName');
    const founderInnInput = form.querySelector('.founderINN');
    const inputFounderCreatedDate = form.querySelector('.founderCreatedDate');
    const inputFounderUpdatedDate = form.querySelector('.founderUpdatedDate');
    founderNameInput.value = founders.get(formId).name;
    founderInnInput.value = founders.get(formId).inn;
    inputFounderCreatedDate.value = founders.get(formId).createdDate;
    inputFounderUpdatedDate.value = founders.get(formId).updatedDate;
}

// Default state of buttons when recovering existing founders
// Fill forms with existing, uploaded from the server Founders
function setButtonsForExistingFounders(form) {
   // const form = $('form#' + i)[0];
    const founderNameInput = form.querySelector('.founderFullName');
    const founderInnInput = form.querySelector('.founderINN');

    lockFounderInputs(founderNameInput, founderInnInput, true);

    const saveFounderButton = form.querySelector('.saveFounderButton');
    const saveChangesButton = form.querySelector('.saveChangesButton');
    const editNewFounderButton = form.querySelector('.editFounderButton');
    saveFounderButton.style.display = 'none';
    editNewFounderButton.disabled = false;
    saveChangesButton.style.display = 'block';
    saveChangesButton.disabled = true;
}

});
