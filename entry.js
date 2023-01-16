Handlebars.registerHelper('formatTime', timestamp =>{
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
    return time;
});

Handlebars.registerHelper('formatBDay', bday =>{
    const months = [
        'января','февраля','марта','апреля',
        'мая','июня','июля','августа',
        'сентября','октября','ноября','декабря',
    ];

    const [day, month] = (bday || '').split('.');
    
    return [day, months[month - 1]].join(' ');
});

Handlebars.registerHelper('formatDay', timestamp =>{
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
    return time;
});

Handlebars.registerHelper('formatId', id =>{
    if(id < 0){
        return 'https://vk.com/public' + id * -1;
    }
    else{
        return 'https://vk.com/id' + id;
    }
});

import Model from './model.js';
import View from './view.js';
import Router from './router.js';

(async() =>{
    try {
        const header = document.querySelector('#header');
        await Model.login(51521661, 2|8192);
        const [me] = await Model.getUser({name_case: ""});

        header.innerHTML = View.render('header', me);
        Router.init();
    } catch (e) {
        console.error(e);
        alert('Ошибка: ' + e.message);
    }
})();
