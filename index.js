'use strict';

const searchURL = 'https://api.github.com/users/'


function getRepos(handle) {
    const url = searchURL + handle + '/repos';
    console.log(url);


fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    //.then(responseJson => console.log(responseJson))
  .then(responseJson => {
        displayResults(responseJson)
    })
    .catch(err => {
        $('.error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    $('.results').empty();
    for (let i=0; i < responseJson.length; i++) {
        console.log(responseJson[i]);
        $('.results').append(
        `<li><a href='${responseJson[i].clone_url}'>${responseJson[i].name}</a></li>`
    )};
    $('.results').removeClass('hidden');
}



function watchInput() {
    $('form').submit(event => {
        event.preventDefault();
        let handleName = $('.repo-name').val();
        getRepos(handleName);
    });
}

$(watchInput);