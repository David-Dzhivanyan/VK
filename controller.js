import Model from "./model.js";
import friendPage from "./pages/friend.js";
import friendsPage from "./pages/friends.js";
import wallPage from "./pages/wall.js";
import newsPage from "./pages/news.js";


export default{
    async friendsRoute(params){
        if(params.id){
            const [friend] = await Model.getUser({user_ids: params.id, fields: 'photo_100, city, country, bdate'})
            const wall = await Model.getWall({owner_id: params.id, filter:'owner'});

            friendPage.setData(friend);
            friendPage.render();
            wallPage.setData(wall.items);
            wallPage.render();
        } else {
            const friends = await Model.getFriends({fields: 'photo_100, bdate'});

            let emptyDiv = document.querySelector('#results-2');
            emptyDiv.innerHTML='<div></div>';

            friendsPage.setData(friends.items);
            friendsPage.render();
        }
    },
    async wallRoute(){
        const [me] = await Model.getUser({ fields: 'photo_100, city, country, bdate'})
        const wall = await Model.getWall();

        friendPage.setData(me);
        friendPage.render();
        wallPage.setData(wall.items);
        wallPage.render();
    },
    async newsRoute(){
        const news = await Model.getNews();

        let emptyDiv = document.querySelector('#results');
        emptyDiv.innerHTML='<div></div>'; 

        newsPage.setData(news.items);
        newsPage.render();
    }
}