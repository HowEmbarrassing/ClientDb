// Buttons Controls
$(document).ready(function () {
    $('.foundersInfoBlock').on("click", "button.saveFounderButton", function (event) {
        event.preventDefault();
        $(this).hide();
        $(this).next().show();
        $(this).next().attr('disabled', true);
        $(this).next().next().attr('disabled', false);
    });

    $('.foundersInfoBlock').on("click", "button.editFounderButton", function (event) {
        event.preventDefault();
        $(this).attr('disabled', true);
        $(this).prev().attr('disabled', false);
    });

    $('.foundersInfoBlock').on("click", "button.saveChangesButton", function (event) {
        event.preventDefault();
        $(this).attr('disabled', true);
        $(this).next().removeAttr('disabled');
    });

    // Block save buttons if input's invalid
    $('.foundersInfoBlock').on("input", "input.founderFullName, input.founderINN", function (event) {
        event.preventDefault();
        const form = $(this).parent().parent()[0];
        const saveFounderButton = form.querySelector('.saveFounderButton');
        const saveChangesButton = form.querySelector('.saveChangesButton');
        const spanFounderError = $(this).next()[0];
        const founderInput = $(this)[0];

        const founderNameInput = form.querySelector('.founderFullName');
        const spanFounderNameError = form.querySelector('.founderNameError');

        const founderInnInput = form.querySelector('.founderINN');
        const spanFounderInnError = form.querySelector('.founderInnError');
        //spanFounderError.textContent = founderInput.validationMessage;

      /*  if ($(event.target).attr('class') === 'founderFullName') {
            if (spanFounderInnError.textContent !== '' || founderInnInput.value === '' || spanFounderNameError.textContent !== '') {
                disableSaveButtons(true, saveFounderButton, saveChangesButton);
            } else {
                disableSaveButtons(false, saveFounderButton, saveChangesButton);
            }
        } else if ($(event.target).attr('class') === 'founderINN') {
            if (spanFounderNameError.textContent !== '' || founderNameInput.value === '' || spanFounderInnError.textContent !== '') {
                disableSaveButtons(true, saveFounderButton, saveChangesButton);
            } else {
                disableSaveButtons(false, saveFounderButton, saveChangesButton);
            }
        }*/

        if (spanFounderInnError.textContent !== '' || founderInnInput.value === '' 
        || spanFounderNameError.textContent !== '' || founderNameInput.value === '') {
                disableSaveButtons(true, saveFounderButton, saveChangesButton);
            } else {
                disableSaveButtons(false, saveFounderButton, saveChangesButton);
            }
        });

    // Block save Client save button if input's invalid
    $('.clientForm').on("input", "input.clientName, input.clientINN", function (event) {
        event.preventDefault();
        checkClientInputs();
        });
});

function  disableSaveButtons(disable, saveFounderButton, saveChangesButton) {
    saveFounderButton.disabled = disable;
    saveChangesButton.disabled = disable;
}

function checkClientInputs() {
    if (spanClientInnError.textContent !== '' || clientInnInput.value === '' 
    || spanClientNameError.textContent !== '' || clientNameInput.value === ''
    || spanClientTypeError.textContent !== '') {
            saveClientButton.disabled = true;
        } else {
            saveClientButton.disabled = false;
        }
}