import Model from "./model.js";
import friendPage from "./pages/friend.js";
import friendsPage from "./pages/friends.js";
import newsPage from "./pages/news.js";


export default{
    async friendsRoute(params){
        if(params.id){
            const [friend] = await Model.getUser({user_ids: params.id, fields: 'photo_100, city, country, bdate'})
            
            friendPage.setData(friend);
            friendPage.render();
        } else {
            const friends = await Model.getFriends({fields: 'photo_100, bdate'});
            
            friendsPage.setData(friends.items);
            console.log(friends);
            friendsPage.render();
        }
    },
    async newsRoute(){
        const news = await Model.getNews();
        
        newsPage.setData(news.items);
        newsPage.render();
    }
}