const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))
app.get("/" ,function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
var firstName = req.body.firstname;
var lastName = req.body.lastname;
var email= req.body.email;

var data ={
    members:[
        {email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
        }
    }
    ]
};
var jsonData=JSON.stringify(data);

// console.log(firstname,lastname,email);
var option={
    url:"https://us21.api.mailchimp.com/3.0/lists/132653ce33",
    method:"POST",
    headers: {
        "Authorization": "ishita 8ec863c3f996272e37e737ce3d23ae45-us21"
    },
    body: jsonData
};
request(option,function(error,response,body){
if (error){
    res.sendFile(__dirname+"/failure.html");
    // console.log(error); 
}else{
    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    // console.log(response.statusCode);
}
})

});

app.post("/failure", function(req,res){
    res.redirect("/");
});
app.listen(3000||process.env.PORT,function(){
    console.log("server is running on port 3000");
});


//api key
// 8ec863c3f996272e37e737ce3d23ae45-us21

//listid
// 132653ce33