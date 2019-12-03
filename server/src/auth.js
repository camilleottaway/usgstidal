

function auth(key){
    if(key != process.env.usgstidalapiadminkey){
        //throw new Error("Not Authorized");    
    }
}


module.exports = auth;