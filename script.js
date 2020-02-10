'use strict'
function displayResults(responseJson) {
  $(responseJson).ready(function () {
        $('.loading').addClass('hidden')
    })
    let character = responseJson[0]
    const characterObject = Object.keys(character).map(key => {
      return `<h4> <span class="character">${key}: ${character[key]}</span></h4>`
    })
    const characterIntro = (
      `<h4 class="othertext"> Hello my name is ${character.name}. ${ character.alias ? `I am also known as, ${character.alias}.` : ""} My blood status is ${character.bloodStatus}. ${ character.house ? `I am apart of ${character.house}. ` : ""} ${character.school ? `I go to ${character.school}.` : "" }</h4> `
    )
  $('.js-results').append(characterIntro)
  $('.results').removeClass('hidden')

}
function errorMessage(error) {
    console.log('errorMessage ran');
    $('.js-results').html(`<h3 class="error othertext">Something went wrong: ${error}</h3>`)
    $('.loading').addClass('hidden');
    $('.js-results').removeClass('hidden')
}

function characterInfo(name) {
    const url = `https://www.potterapi.com/v1/characters?key=$2a$10$Tk/k8xV9uEVq/bJJWuOhZeUUTfLog/NuhDvPwRwnS9dwD2TNmbQX.&name=${name}`
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            errorMessage('That Character name is not valid');
        });
}

function getSearchPhrase() {
    return (['Search', 'Find','Look up','Go','Check','Push this button','Enter'])[Math.floor(Math.random() * 7)];
}
function submit() {
  $('#js-form').submit(event => {
        event.preventDefault();
        console.log('submit ran');
        //determine the text of the button
        let searchPhrase = getSearchPhrase()
        console.log(searchPhrase)
        //change the text of the search button
        $('#find-btn').html(searchPhrase)
        //clears any prior data from results section
        $('.js-results').empty().addClass('hidden')
        //store username 
        const name = $('.js-name').val();
        console.log(name);
        //This utilizes setTimeout function to test progress indicator animation
        $('.loading').removeClass('hidden');
        setTimeout(function () {
            characterInfo(name);
        }, 1000)
    });

}

$(submit);