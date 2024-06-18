const auth = { 
    protected(request, response, next) { 
        console.log(request.session.user); //TODO undefined
        if (request.session.user) { 
            next(); 
        } else { 
            response.redirect('/login'); 
        } 
    }, 
} 
 
module.exports = auth; 