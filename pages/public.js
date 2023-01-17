import View from "../view.js";

const resultsNode = document.querySelector('#results');
let group = {};

export default {
    setData(newFriend){
        group = newFriend;
    },
    render(){
        resultsNode.innerHTML = View.render('public', group);
    }
}