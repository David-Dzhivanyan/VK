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
