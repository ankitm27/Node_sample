const isLogin = () => {
    if(localStorage.getItem("token")){
        return true;
    }else{
         return false;
    }
}

exports.isLogin = isLogin;