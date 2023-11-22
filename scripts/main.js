let form = document.getElementById(".form");

/* inputs*/
const commitM = document.getElementById('commitM'),
    selectCommitType = document.getElementById('selectCommitType'),
    optionalCommitScope = document.getElementById('optionalCommitScope'),
    commitDateTime= document.querySelector('.commit-date-time'),
    commitDescription= document.getElementById('commitDescription'),
    optionalCommitBody= document.getElementById('optionalCommitBody'),
    optionalCommitFooter= document.getElementById('optionalCommitFooter'),
    commitResult= document.getElementById('commitResult');
    allRequiredInputs = [
        selectCommitType,
        commitDateTime,
        commitDescription,
    ]
/* inputs [end] */

/* buttons */
const currentDateBtn = document.querySelector('.current-date-btn'),
    createBtn = document.querySelector('.create-btn'),
    copyBtn = document.querySelector('.copy-btn'),
    previewBtn = document.querySelector('.preview-btn'),
    backBtn = document.querySelector('.back-btn');
/* buttons [end] */

/* outputs */
let commitMText = "",
    selectCommitTypeText = "",
    optionalCommitScopeText = "",
    commitDateTimeText = "",
    commitDescriptionText = "",
    optionalCommitBodyText = "",
    optionalCommitFooterText = "",
    commitResultText = "";
/* outputs [end] */

/* preview */
const previewWindow = document.querySelector('.preview');
/* preview [end] */

/* --------------------------------------------------------------- */
/* GET DATA FROM TEXT INPUTS */

function getTextFromInput (input) {
    if (input.tagName.toLowerCase() === "select") {
        let selectedOption = input.options[input.selectedIndex];
        return selectedOption.value;
    } else {
        return input.value;
    }
}
/* [select-type] INPUT */

/* [select-type] INPUT [end] */
/* GET DATA FROM TEXT INPUTS [end] */
/* --------------------------------------------------------------- */


/* --------------------------------------------------------------- */
/* CHECKBOX value */
/* checkbox checked, true or false */
function checkBoxGetValue (checkbox) {
    return checkbox.checked;
}
/* checkbox checked, true or false [end] */

/* checkbox value to result text */
function checkBoxResult (checkBoxChecked, checkboxResultVar) {
    checkboxResultVar = checkBoxChecked ? "git commit -m " : " ";
    commitMText = checkboxResultVar;
    return checkboxResultVar;
}
/* checkbox value to result text [end] */

/* CHECKBOX value [end] */
/* --------------------------------------------------------------- */

/* --------------------------------------------------------------- */
/* check inputs */
function allRequiredInputsCheck (inputsArr) {
    inputsArr.forEach((element) => {
        if (element.tagName.toLowerCase() === "select") {
            if (element.value !== "select") {
                element.classList.remove('terminal-form__input--red');
                console.log('select: ', element.value)
            } else {
                element.classList.add('terminal-form__input--red');
            }
        } else if (element.tagName.toLowerCase() === "input") {
            if (element.value !== "") {
                element.classList.remove('terminal-form__input--red');
                console.log('input: ', element.value)
            } else {
                element.classList.add('terminal-form__input--red');
            }
        } else if (element.tagName.toLowerCase() === "textarea") {
            if (element.value !== "") {
                element.classList.remove('terminal-form__input--red');
                console.log('textarea: ', element.value)
            } else {
                element.classList.add('terminal-form__input--red');
            }
        }
    })
}
function isInputEmpty (input) {
    if (input.tagName.toLowerCase() === "select") {
        if (input.value !== "select") {
            input.classList.remove('terminal-form__input--red');
            console.log('select: ', input.value)
            return true;
        } else {
            input.classList.add('terminal-form__input--red');
            allRequiredInputsCheck(allRequiredInputs);
            return false;
        }
    } else if (input.tagName.toLowerCase() === "input") {
        if (input.value !== "") {
            input.classList.remove('terminal-form__input--red');
            console.log('input: ', input.value)
            return true;
        } else {
            input.classList.add('terminal-form__input--red');
            allRequiredInputsCheck(allRequiredInputs);
            return false;
        }
    } else if (input.tagName.toLowerCase() === "textarea") {
        if (input.value !== "") {
            input.classList.remove('terminal-form__input--red');
            console.log('textarea: ', input.value)
            return true;
        } else {
            input.classList.add('terminal-form__input--red');
            allRequiredInputsCheck(allRequiredInputs);
            return false;
        }
    }
    console.log(input, input.value !== "");
}
/* check inputs [end] */
/* --------------------------------------------------------------- */

/* --------------------------------------------------------------- */
/* PREPARE RESULT */
function stringConcatenation () {
    if (
        isInputEmpty(selectCommitType)
        && isInputEmpty(commitDateTime)
        && isInputEmpty(commitDescription)
    ) {
        commitMText = checkBoxResult(commitM)
        selectCommitTypeText = getTextFromInput(selectCommitType);
        optionalCommitScopeText = getTextFromInput(optionalCommitScope);
        commitDateTimeText = getTextFromInput(commitDateTime);
        commitDescriptionText = getTextFromInput(commitDescription);
        optionalCommitBodyText = getTextFromInput(optionalCommitBody);
        optionalCommitFooterText = getTextFromInput(optionalCommitFooter);

        if (optionalCommitScopeText !== "") {
            selectCommitTypeText = selectCommitTypeText.slice(0, -1);
            optionalCommitScopeText =
                "(" + optionalCommitScopeText + ")" + ":";
        }
        let result =
            commitMText +
            selectCommitTypeText +
            optionalCommitScopeText + " " +
            commitDescriptionText + "; \n" + " \n" +
            commitDateTimeText + "; \n" + " \n" +
            optionalCommitBodyText + "; \n" + " \n" +
            optionalCommitFooterText + ";";
        console.log("result:" + result)
        return result;
    } else {
        return "Not all required fields are filled in";
    }
}
/* PREPARE RESULT [end] */
/* --------------------------------------------------------------- */

/* --------------------------------------------------------------- */
/* SET RESULT */
function setResultData (data) {
    commitResult.value = data;
}
/* SET RESULT [end] */
/* --------------------------------------------------------------- */

/* --------------------------------------------------------------- */
/* REQUIRED INPUTS LISTENERS */
selectCommitType.addEventListener('input', () => {
    isInputEmpty(selectCommitType);
})
commitDateTime.addEventListener('input', () => {
    isInputEmpty(commitDateTime);
})
commitDescription.addEventListener('input', () => {
    isInputEmpty(commitDescription);
})
/* REQUIRED INPUTS LISTENERS [end] */
/* --------------------------------------------------------------- */

/* --------------------------------------------------------------- */
function getDate () {
    return new Date();
}
/* BUTTONS LISTENERS */
/* current date and time */
currentDateBtn.addEventListener('click', (event) => {
    commitDateTime.classList.remove('commit-date-time--small-text');
    commitDateTimeText = getDate();
    console.log(commitDateTimeText);
    commitDateTime.value = commitDateTimeText;
    isInputEmpty(commitDateTime);
    commitDateTime.classList.add('commit-date-time--small-text');
});
/* current date and time [end] */

/* create commit */
createBtn.addEventListener('click', (event) => {
    setResultData(stringConcatenation());
});
/* create commit [end] */

/* copy commit text */
copyBtn.addEventListener('click', (event) => {
    CopyTextFromInput(commitResult);
})
/* copy commit text [end] */

/* preview */
previewBtn.addEventListener('click', (event) => {
    previewWindow.classList.add('preview--visible');
    backBtn.classList.add('back-btn--visible')
})
/* preview [end] */

/* back to commit creator */
backBtn.addEventListener('click', (event) => {
    previewWindow.classList.remove('preview--visible');
    backBtn.classList.remove('back-btn--visible')
})
/* back to commit creator [end] */

/* BUTTONS LISTENERS */

/* --------------------------------------------------------------- */
/* copy created commit */
function CopyTextFromInput(input) {
    input.select();
    try {
        navigator.clipboard.writeText(input.value)
            .then(() => {
                alert("Copied the text: \n" + input.value);
            })
            .catch(err => {
                console.error("Unable to copy text. Please copy it manually.", err);
            });
    } catch (err) {
        console.error("Unable to copy text. Please copy it manually.", err);
    }

    window.getSelection().removeAllRanges();}
/* copy created commit [end] */
/* --------------------------------------------------------------- */