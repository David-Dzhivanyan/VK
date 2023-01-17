import Model from "./model.js";
import friendPage from "./pages/friend.js";
import friendsPage from "./pages/friends.js";
import wallPage from "./pages/wall.js";
import newsPage from "./pages/news.js";
import publicPage from "./pages/public.js";


export default{
    async friendsRoute(params){
        if(params.id){
            const [friend] = await Model.getUser({user_ids: params.id, fields: 'photo_100, city, country, bdate, status'})
            const wall = await Model.getWall({owner_id: params.id});

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
        const [me] = await Model.getUser({ fields: 'photo_100, city, country, bdate, status'})
        const wall = await Model.getWall();

        friendPage.setData(me);
        friendPage.render();
        wallPage.setData(wall.items);
        wallPage.render();
    },
    async newsRoute(){
        const news = await Model.getNews({filters:'post', source_ids:'friends,groups,pages,following'});

        let emptyDiv = document.querySelector('#results');
        emptyDiv.innerHTML='<div></div>'; 

        console.log(news.items);
        newsPage.setData(news.items);
        newsPage.render();
    },
    async publicRoute(params){
        let absId;
        if(params.id < 0){
            absId = params.id * -1;
        }else{
            absId = params.id;
        }
        const public1 = await Model.getPublic({group_id: absId});
        const wall = await Model.getWall({owner_id: params.id});

        publicPage.setData(public1);
        publicPage.render();
        wallPage.setData(wall.items);
        wallPage.render();
    }
}