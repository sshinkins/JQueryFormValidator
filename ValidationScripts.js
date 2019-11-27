$(document).ready(function () {
// Validation element Arrays. Add element Id's here to give client-side validation.

    // Insert any input element ID's that are required to be completed as a string.
    var requiredArray = ["id1", "id2"];

    //Insert any paired element Ids, as an array of pair's Id strings, in order (i.e field thats highest up the page first)
    //A paired element is defined as an input element that is required if another input element has value.
    var pairedArray =[["pairedId1","pairedId2"],["pairedId3","pairedId4"]];

    //Insert a element id, aregex for a field to be tested against and a message to be revealed if it does not pass.
    var regexArray =[["regexId1", /^https:\/\//i ,"URL should start with 'https://'"], ["regexId2", /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i , "Date should be in DD/MM/YYYY format"]];


// This section's code inserts the html attribute tags needed to implement validation code.

    //Insert's the requireThis attribute to any elements in the requiredArray.
    requiredArray.forEach(fieldID => {
        $('#' + fieldID).attr("requireThis", true);
    });

    //Insert's the pairedWith attribute to any elements in the pairedArray.
    pairedArray.forEach(pairArray => {
        $('#' + pairArray[0]).attr("pairedWith", pairArray[1]);
        $('#' + pairArray[1]).attr("pairedWith", pairArray[0]);
    });

    regexArray.forEach(regexArray => {
        $('#' + regexArray[0]).attr("regexTest", true);
    });

        $("#submit").attr("disabled", true);


// This section handles user inputs and reveals or hides error messages accordingly.

    //Adds an error message & highlights field after field is left empty. Reverse's both upon correction instantly.
    $("[requireThis]").each(function() {
        $(this).blur(function() {
            if (!$(this).val() && ($(this).next().attr('id') != "requiredError")) {
                $(this).attr("style", "border-color: Red");
                $(this).after('<div id="requiredError" class="alert alert-danger validationError" role="alert">Error: Field Is Required.</div>');
            }
            validateform();
        });
        $(this).on("change paste keyup",function() {
            if ($(this).val() && ($(this).next().attr('id') == "requiredError")) {
                $(this).removeAttr("style", "border-color: Red");
                $(this).next().remove();
            }
            validateform();
        });
    });

    //Adds an error message & highlights paired element after it's partner is left empty. Reverse's both upon correction instantly.
    pairedArray.forEach(pairArray => {
        $('#' + pairArray[1]).blur(function() {
            if ((($('#' + pairArray[0]).val() || $('#' + pairArray[1]).val()) && (!($('#' + pairArray[0]).val() && $('#' + pairArray[1]).val())))) {
                if ($('#' + pairArray[0]).val()) {
                    $(this).attr("style", "border-color: Red");
                    $(this).after('<div id="pairedError" class="alert alert-danger validationError" role="alert">Error: Field Is Required.</div>');
                }
                else {
                    $('#' + pairArray[0]).attr("style", "border-color: Red");
                    $('#' + pairArray[0]).after('<div id="pairedError" class="alert alert-danger validationError" role="alert">Error: Field Is Required.</div>');
                }
            }
            validateform();
        });

        $("[pairedWith]").on("change paste keyup",function() {
            var pair = $(this).attr("pairedWith");
            if ($(this).next().attr('id') == "pairedError") {
                if (($(this).val() && $('#' + pair).val()) || (!($(this).val())) && !($('#' + pair).val())) {
                    $(this).removeAttr("style", "border-color: Red");
                    $(this).next().remove();
                }
            }
            if (($('#' + pair).next().attr('id') == "pairedError")){
                if (($(this).val() && $('#' + pair).val()) || (!($(this).val())) && !($('#' + pair).val())) {
                    $('#' + pair).removeAttr("style", "border-color: Red");
                    $('#' + pair).next().remove();
                }
            }
            validateform();
        });
    });

     //Adds an error message & highlights input element if it fails it's regex test. Reverse's both upon correction instantly.
    regexArray.forEach(regexArray => {
        var regex = regexArray[1];
        $('#' + regexArray[0]).blur(function() {
            if ($(this).val() && (!(regex.test($(this).val()))) && ($(this).next().attr('id') != "regexError"))  {
                $(this).attr("style", "border-color: Red");
                $(this).after('<div id="regexError" class="alert alert-danger validationError" role="alert">' + regexArray[2] + '</div>');
            }
            validateform();
        });
        $('#' + regexArray[0]).on("change paste keyup",function() {
            if ((!($(this).val())||(regex.test($(this).val()))) && ($(this).next().attr('id') == "regexError")) {
                $(this).removeAttr("style", "border-color: Red");
                $(this).next().remove();
            }
            validateform();
        });
    });


    //Does group validation for the whole form based on if required fields are filled, and if any errors are present
    function validateform() {
        var formValid = true;
        $("[requireThis]").each(function() {
            if (!($(this).val())) {
                formValid = false;
            }
        });
        if ($(".validationError").length > 0) {
                formValid = false;
        }

        if (formValid == true) {
            $("#submit").removeAttr("disabled", true);
        }
        else {
            $("#submit").attr("disabled", true);
        }
    }
});