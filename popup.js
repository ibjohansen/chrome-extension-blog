'use strict';

// funksjon som henter alle cookies basert på et filter,
// i dette tilfellet domenet skatteetaten og cookie-navnet
// funksjonen tar en callback, som trigges når chrome.cookies.getAll
// returnerer med en eller flere cookies
// chrome.cookies.getAll tar et config-object, og en callback
function getCookies(callback) {
    chrome.cookies.getAll(
        {
            'domain': 'www.skatteetaten.no',
            'name': 'contrast'
        }, function (cookies) {
            callback(cookies);
        }
    );
}

// funksjon som lager et label-element
// tar en label-tekst og en id til feltet som labelen gjelder for
function createLabel(label, id) {
    var elm_label = document.createElement('label');
    elm_label.className = '.label';
    elm_label.setAttribute('for', id);
    elm_label.innerHTML = label;
    return elm_label
}

// funksjon som lager en input-element
// tar en verdi til feltet og en id som settes på elementet
function createInput(value, id) {
    var elm_input = document.createElement('input');
    elm_input.setAttribute('id', id);
    elm_input.setAttribute('tabIndex', '-1');
    elm_input.value = value;
    return elm_input
}

// funksjon som lager et rad-element (div), bestående av
// et label og et input element
// tar en teller, label-tekst, og input verdi
// kaller createLabel og createInput
function createRow(idx, label, value) {
    var elm_row = document.createElement('div');
    elm_row.className = 'cookie';

    elm_row.appendChild(createLabel(label, 'lbl_' + idx));
    elm_row.appendChild(createInput(value, 'inp_' + idx));

    return elm_row;
}

// legger til en listener på document
// som trigges når popup.html er klar
// denne kaller getCookies, og legger inn verdiene som
// den får tilbake
document.addEventListener('DOMContentLoaded', function () {

    getCookies(function (cookies) {

        cookies.forEach(function (cookie, idx) {
            var id = idx + '_' + cookie.name;
            var cookieDiv = document.createElement('div');

            cookieDiv.appendChild(createRow(id, 'Navn', cookie.name));
            cookieDiv.appendChild(createRow(id, 'Verdi', cookie.value));
            cookieDiv.appendChild(createRow(id, 'Domene', cookie.domain));
            cookieDiv.appendChild(createRow(id, 'Sti', cookie.path));

            document.getElementById('cookies').appendChild(cookieDiv);
        });
    });
});
