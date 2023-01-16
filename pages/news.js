import View from "../view.js";

const resultsNode = document.querySelector('#results-2');
let items = [];

export default {
    setData(newItems){
        items = newItems;
    },
    render(){
        resultsNode.innerHTML = View.render('news', { list: items });
    }
}