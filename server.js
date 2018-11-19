const express = require('express');
const hbs   =   require('hbs');
const fs    =   require('fs');
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine",'hbs');
/* creating a middleware for express to read static directory public */
app.use(express.static(__dirname + '/public'));

/* Middleware 1 */
app.use((req,res, next)=>{

    var date = new Date().toString();
    var log = `${date}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n',(error)=>{
        if(error){
            console.log(error);
        }
    });
    next();
});
/* Middleware 2 */
// app.use((req,res, next)=>{
//     res.render('maintenance');
// });
/** end middleware 2 */

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

/* creating express handler start here */
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        title:'Home page',
        welcomeMessage: 'Welcome to home page'
    });
});
app.get('/about',(req,res)=>{
    // res.send('<h1>Hey from about!</h1>');
    res.render('about.hbs',{
        title:'About page',
        welcomeMessage: 'Welcome to About page'
    });
});


app.get('/bad',(req,res)=>{
    res.send({
        error: "Page not found!!"
    });
});
/* end here*/ 
/* binding handler to port 3000 */
app.listen(port ,()=>{
    console.log(`Starting at port ${port}`);
});