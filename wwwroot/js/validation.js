$(document).ready(function () {
    // Founder Form Validation
    $('.foundersInfoBlock').on("input", "input.founderFullName, input.founderINN", function (event) {
        event.preventDefault();
        //     const saveFounderButton = form.querySelector('.saveFounderButton');
        //     const saveChangesButton = form.querySelector('.saveChangesButton');
        const spanFounderError = $(this).next()[0];
        const founderInput = $(this)[0];
        const form = $(this).parent().parent()[0];

        if ($(event.target).attr('class') === 'founderINN') {
            const founderInnInput = form.querySelector('.founderINN');
            const isInnUnique = checkFounderInnUniqueness(form, founderInnInput);
            if (!isInnUnique) {
                spanFounderError.textContent = 'Учредитель с таким ИНН уже добавлен этому Клиенту.';
            } else {
                spanFounderError.textContent = founderInput.validationMessage;
            }
        } else {
            spanFounderError.textContent = founderInput.validationMessage;
        }
    });

    // Client Form validation
    $('.clientForm').on("input", "input.clientName, input.clientINN", function (event) {
        event.preventDefault();
        const spanClienError = $(this).next()[0];
        const clientInput = $(this)[0];
        spanClienError.textContent = clientInput.validationMessage;
    });

    $('select.clientTypeSelect').change(function() {
        checkNumberOfFounders();
        checkClientInputs();
    });

});

// Validate Client type and number of Founders in it (Should be at lease one)
function checkNumberOfFounders() {
    if (clientTypeSelect.value !== "ИП" && founders.size < 1) {
        spanClientTypeError.textContent = 'У Юридического лица должен быть указан как минимум один учредитель';
    } else {
        spanClientTypeError.textContent = '';
    }
}

// Validate INN uniqueness
function checkFounderInnUniqueness(form, founderInnInput) {
    if (founders.size === 0) {
        return true;
    }
    let founderIndex = getKeyByValue(founders, founderInnInput);
    for (let founder of founders.values()) {
        if (Number(founder.inn) === Number(founderInnInput.value) && founderIndex !== form.id) {
            return false;
        } else {
            return true;
        }
    }
}

// Get Founders Index number using Founder's value
function getKeyByValue(founders, founderInnInput) {
    for (let [key, value] of founders.entries()) {
        if (Number(value.inn) === Number(founderInnInput.value))
            return key;
    }
}