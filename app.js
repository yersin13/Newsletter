const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));



app.get("/", function(req, res){
   res.sendFile(__dirname + "/signup.html"); 
});

app.post("/", function(req, res){
   
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    
 var data = {
     members:[{
        email_address:email,
         status:"subscribed",
         merge_fields: {
             FNAME: firstName,
             LNAME: lastName
         } 
     }
]};
 
var jsonData = JSON.stringify(data);
    
    var options = {
      url: "https://us4.admin.mailchimp.com/lists/1e77fffef5/",
        method: "POST",
        headers: {
            "Authorization": "yersin13 3e751535177059cf17806393b9948a98-us4"
        },
        body: jsonData
    };
    
    request(options,function(error, response, body){
       if (error) {
           console.log(error);
       }  else {
           console.log(response.statusCode);
       }
    });
});




app.listen(3000,function(){
    console.log("server Started at channel 3000");
});



//3e751535177059cf17806393b9948a98-us4

//1e77fffef5