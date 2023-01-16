import Model from "./model.js";
import friendPage from "./pages/friend.js";
import friendsPage from "./pages/friends.js";
import newsPage from "./pages/news.js";


export default{
    async friendsRoute(params){
        if(params.id){
            const [friend] = await Model.getUser({user_ids: params.id, fields: 'photo_100, city, country, bdate'})
            const news = await Model.getNews({owner_id: params.id, filter:'owner'});

            friendPage.setData(friend);
            friendPage.render();
            newsPage.setData(news.items);
            newsPage.render();
        } else {
            const friends = await Model.getFriends({fields: 'photo_100, bdate'});
            let da = document.querySelector('#results-2');
            da.innerHTML='<div></div>';
            friendsPage.setData(friends.items);
            friendsPage.render();
        }
    },
    async newsRoute(){
        const [me] = await Model.getUser({ fields: 'photo_100, city, country, bdate'})
        const news = await Model.getNews();

        friendPage.setData(me);
        friendPage.render();
        newsPage.setData(news.items);
        newsPage.render();
    }
}