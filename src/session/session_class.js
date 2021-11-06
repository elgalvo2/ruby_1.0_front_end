var Session = function() { // validaciones de fechas y datos en HTML
    var sThis = this;
    this.SessionData = {
        user: {
            auth:"",
            user_name:"",
            preferences:"",
        },
        tasks:[],
    };
    var getUser = function(){
        return sThis.SessionData.user;
    }
    var setUser = function(mutter){
        sThis.SessionData.user.auth = mutter.auth || "";
        sThis.SessionData.user.user_name = mutter.userName || "";
        sThis.SessionData.user.preferences = mutter.preferences || "";
    }

    var getTasks = function(){
        return sThis.SessionData.tasks;
    }

    var setTasks = function(tsks){
        sThis.SessionData.tasks = tsks;
    }
    return {
        getUser: getUser,
        setUser: setUser,
        getTasks: getTasks,
        setTasks: setTasks,
    };
};
module.exports = Session