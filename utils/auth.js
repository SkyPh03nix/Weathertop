const auth = { 
    protected(request, response, next) { 
        console.log("auth.protected(): user: ",request.session.user); //TODO undefined
        if (request.session.user) { 
            next(); 
        } else { 
            response.redirect('/'); 
        } 
    }, 

    guest(request, response, next) {
        if (request.session.user) {
            return response.redirect("/dashboard");
        }
        next();
    }
}
 
module.exports = auth;