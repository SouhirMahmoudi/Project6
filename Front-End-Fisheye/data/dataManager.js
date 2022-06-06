import data from "./photographers.js";

function getPhotographerById(id) {
    return data.photographers.filter(obj => {
        if (obj.id === id) return obj;
    })[0];
}

function getMediaByPhotographerId(id) {
    return data.media.filter(imageOuVideo => {
        return imageOuVideo.photographerId === id;
    });
}

function photographersList() {
    return data.photographers;
}

function getMediaById(MediaId) {
    return data.media.filter(obj => {
        if (obj.id === MediaId) return obj;
    })[0];
}

/**
 * 
 * @param {("popularity"| "date" |   "title")} mode 
 * @param {Array} list
 */
function sort(mode, list){
    const methods = {};
    methods.popularity =  function (x, y) {
        if (x.likes > y.likes) { return -1; }
        if (x.likes < y.likes) { return 1 ;}
        return 0;
    };
    methods.date = function (x, y) {
        if (x.date > y.date) { return -1 ;}
        if (x.date < y.date) { return 1 ;}
        return 0;
    };
    methods.title = function (x, y) {
        if (x.title < y.title) { return -1 ;}
        if (x.title > y.title) { return 1; }
        return 0;
    };
    return list.sort(methods[mode]);
}



/*function CountLike() {
    var cnt = 0;
    cnt = parseInt(cnt) + parseInt(1);
    var divData = document.getElementById("showCount");
   // divData.innerHTML = cnt + ;

}
/*function getIdBy(MediaId){
    return data.media.filter(obj=>{
        if (obj.id === MediaId) return obj;
    })[0];
}*/
export {
    getMediaByPhotographerId,
    getPhotographerById,
    photographersList,
    getMediaById,
    sort
};