// CREATE NEW FOUNDER FORM
function createFounderForm() {
    const founderForm = document.createElement('form');
    founderForm.className = 'founderForm';
    founderForm.id = index;

    const divFounderName = document.createElement('div');
    divFounderName.className = 'form-group';
    const divFounderINN = document.createElement('div');
    divFounderINN.className = 'form-group';
    const divFounderButtons = document.createElement('div');
    divFounderButtons.className = 'form-group';
    const divFounderDates = document.createElement('div');
    divFounderDates.className = 'form-group';

    const labelFounderName = document.createElement('label');
    labelFounderName.textContent = 'ФИО учредителя';
    labelFounderName.setAttribute('for', 'founderFullName');
    const inputFounderName = document.createElement('input');
    inputFounderName.className = 'founderFullName';
    inputFounderName.pattern = '[A-zА-я ]*';
    inputFounderName.required = 'required';
    inputFounderName.type = 'text';
    const spanFounderName = document.createElement('span');
    spanFounderName.className = 'founderNameError';

    divFounderName.append(labelFounderName, inputFounderName, spanFounderName);

    const labelFounderINN = document.createElement('label');
    labelFounderINN.textContent = 'ИНН учредителя';
    labelFounderINN.setAttribute('for', 'founderINN');
    const inputFounderINN = document.createElement('input');
    inputFounderINN.className = 'founderINN';
    inputFounderINN.pattern = '[0-9]*';
    inputFounderINN.required = 'required';
    inputFounderINN.minLength = 12;
    inputFounderINN.maxLength = 12;
    inputFounderINN.type = 'tel';
    const spanFounderINN = document.createElement('span');
    spanFounderINN.className = 'founderInnError';

    divFounderINN.append(labelFounderINN, inputFounderINN, spanFounderINN);

    const inputFounderCreatedDate = document.createElement('input');
    inputFounderCreatedDate.className = 'founderCreatedDate';
    inputFounderCreatedDate.type = 'hidden';
    const inputFounderUpdatedDate = document.createElement('input');
    inputFounderUpdatedDate.type = 'hidden';
    inputFounderUpdatedDate.className = 'founderUpdatedDate';

    divFounderDates.append(inputFounderCreatedDate, inputFounderUpdatedDate);

    const saveNewFounderButton = document.createElement('button');
    saveNewFounderButton.type = 'button';
    saveNewFounderButton.className = 'saveFounderButton';
    saveNewFounderButton.textContent = 'Сохранить учредителя';

    const saveNewChangesButton = document.createElement('button');
    saveNewChangesButton.type = 'button';
    saveNewChangesButton.className = 'saveChangesButton';
    saveNewChangesButton.textContent = 'Сохранить изменения';

    const editNewFounderButton = document.createElement('button');
    editNewFounderButton.type = 'button';
    editNewFounderButton.className = 'editFounderButton';
    editNewFounderButton.textContent = 'Изменить учредителя';

    const deleteNewFounderButton = document.createElement('button');
    deleteNewFounderButton.type = 'button';
    deleteNewFounderButton.className = 'deleteFounderButton';
    deleteNewFounderButton.textContent = 'Удалить учредителя';

    // Default state of save buttons is disabled
    saveNewFounderButton.disabled = true;
    saveNewChangesButton.disabled = true;
    saveNewChangesButton.style.display = 'none';
    editNewFounderButton.disabled = true;

  //  $( document ).ready(function() {
       // $('.founderForm button').addClass('btn btn-white');
        //$('.saveChangesButton').toggle();
  //     $('.editFounderButton').attr('disabled', true);
   // });

    divFounderButtons.append(saveNewFounderButton, saveNewChangesButton, editNewFounderButton, deleteNewFounderButton);
    founderForm.append(divFounderName, divFounderINN, divFounderDates, divFounderButtons);
    foundersFormsBlock.appendChild(founderForm);

    index++;
    return founderForm;
}


// Attach a delegated event handler for FOUNDER FORM BUTTON
$( ".foundersInfoBlock" ).on( "click", "button.deleteFounderButton, button.saveFounderButton, button.saveChangesButton, button.editFounderButton", function( event ) {
    event.preventDefault();
    const form = $(this).parent().parent()[0];
    const button = $(this)[0];
    const founderNameInput = form.querySelector('.founderFullName');
    const founderInnInput = form.querySelector('.founderINN');
    console.log(button.className);
    switch (true) {
        case button.className.includes('deleteFounderButton'):
            console.log('Deleting founder button of form with id ' + form.id);
            removeFounder(form);
            checkNumberOfFounders();
            checkClientInputs();
            break;
        case button.className.includes('editFounderButton'):
            console.log('Editing founder button of form with id ' + form.id);
            lockFounderInputs(founderNameInput, founderInnInput, false);
            // editFounder(form, founderNameInput, founderInnInput); // does nothing right now
            break;
        case button.className.includes('saveFounderButton'):
            console.log('Saving founder button of form with id ' + form.id);
            saveFounder(form, founderNameInput, founderInnInput);
            lockFounderInputs(founderNameInput, founderInnInput, true);
            checkNumberOfFounders();
            checkClientInputs();
            break;
        case button.className.includes('saveChangesButton'):
            console.log('Saving changes for a founder of form with id ' + form.id);
            saveChanges(form, founderNameInput, founderInnInput);
            lockFounderInputs(founderNameInput, founderInnInput, true);
            break;
        default:
            console.log('Event handling, Something went wrong');
    }
});

// Remove founder function
function removeFounder(form) {
    if (form.id !== undefined) {
        excludeFounderFromCollection(form);
    }
    deleteInputForm(form);
    console.log('DELETION:');
    console.log(founders);
}

// check if Founders contains a Founder of this form and removes it
function excludeFounderFromCollection(form) {
    // pulls out Founder, connected to the button, from Founder array
    let founderIndex = form.id;
    // check if Founders contains a Founder of this form and removes it
    if (founders.has(founderIndex)) {
        founders.delete(founderIndex);
        clientFoundersListInput.value = getJSONFromMap(founders);
    }
}
// remove the form
function deleteInputForm(form) {
    const parent = form.parentElement;
    parent.removeChild(form);
}

function saveFounder(form, nameInput, innInput) {
    // create Founder using input data
    let founder = createFounder(nameInput, innInput);
    // add Founder to Founders Map 
    founders.set(form.id, founder);

    // send Founders Map to the input
    clientFoundersListInput.value = getJSONFromMap(founders);
    // log Founders array
    console.log('CREATION:');
    console.log(founders);
    console.log(clientFoundersListInput.value);
}

// Return newly created Founder
function createFounder(nameInput, innInput) {
    let dateTimeNow = convertDate();
    let founder = new Founder(nameInput.value, innInput.value, 
        dateTimeNow, dateTimeNow);
    return founder;
}

// Convert Map to JSON string
function getJSONFromMap(founders) {
    let array = [];
    for (let founder of founders.values()) {
        array.push(founder);
    }
    return JSON.stringify(array);
}

// Get a Date string that can be read by JSON deserializer
function convertDate() {
    function addZero(timeString) {
        if (timeString.toString().length < 2) {
            return "0" + timeString;
        } else {
            return timeString;
        }
    }
    var date = new Date();
    var day = date.getDate();       // yields date
    day = addZero(day);
    var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    month = addZero(month);
    var year = date.getFullYear();  // yields year
    var hour = date.getHours();     // yields hours 
    hour = addZero(hour);
    var minute = date.getMinutes(); // yields minutes
    minute = addZero(minute);
    var second = date.getSeconds(); // yields seconds
    second = addZero(second);
    // After this construct a string with the above results as below
    var time = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    return time;
}

function editFounder(form) {
    // unlocks the input and savebutton, locks editbutton 
    lockFounderInputs(false, founderFullNameInput, founderInnInput);

    tempSaveChangesButton.disabled = false;
    tempSaveChangesButton.style.display = 'block';

    tempEditFounderButton.disabled = true;
    checkFounderInputs(tempSaveChangesButton, founderFullNameInput, founderInnInput);
}

function saveChanges(form, nameInput, innInput) {
    // pulls out Founder, connected to the button, from Founder array
    // validates inputs, if they are incorrect, shows warning
    // updates Founder in array Founders, using input data
    console.log('typeof form.id');
    console.log(typeof form.id);
 /*   console.log('form');
    console.log(form);
    console.log('founders.get(0)');
    console.log(founders.get(0));
    console.log('founders.get(Number(form.id))');
    console.log(founders.get(Number(form.id)));*/
    console.log('founders.get(Number(form.id)).createdDate');
    console.log(founders.get(form.id).createdDate);
    let tempCreatedDate = founders.get(form.id).createdDate;

    let editedFounder = updateFounder(nameInput, innInput, tempCreatedDate);

    founders.set(form.id, editedFounder);
    // updates input info
    clientFoundersListInput.value = getJSONFromMap(founders);
    // locks the input and savebutton
    //lockFounderInputs(true, founderFullNameInput, founderInnInput);
    //tempSaveFounderButton.disabled = true;
    //tempEditFounderButton.disabled = false;
   // tempSaveChangesButton.disabled = true;
    // log founders array
    console.log('UPDATE:');
    console.log(founders);
    console.log(clientFoundersListInput.value);
}

// Return an updated Founder
function updateFounder(nameInput, innInput, createdTime) {
    let dateTimeNow = convertDate();
    let founder = new Founder(nameInput.value, innInput.value, 
        createdTime, dateTimeNow);
    return founder;
}

// Lock Inputs toggle
function lockFounderInputs(founderNameInput, founderInnInput, isLocked) {
    if (isLocked) {
        $(founderNameInput).attr('disabled', true);
        $(founderInnInput).attr('disabled', true);
    }
    else {
        $(founderNameInput).removeAttr('disabled');
        $(founderInnInput).removeAttr('disabled');
    }
}