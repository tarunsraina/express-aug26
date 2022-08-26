
const express = require('express');
const fs = require('fs');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

const PORT = process.env.PORT || 3000

app.get('/active',(req,res)=>{

    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        let users = data.split("#");
        res.render('activeUsers',{users:users})
    }
    )})

    app.get('/inactive',(req,res)=>{

        fs.readFile('users.txt', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            let users = data.split("#");
            res.render('inactiveUsers',{users:users})
        }
        )})

app.get('/',(req,res)=>{
    
fs.readFile('users.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  let users = data.split("#");
  res.render('home',{users:users})
});

    
})

app.post('/',(req,res)=>{
    let name = req.body.name;
    console.log(name);
    fs.appendFile("users.txt", "#"+name+"-A", (err) => {
    })

    res.redirect('/')
})


app.post('/active',(req,res)=>{
    let name = req.body.name;

    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        
        let users = data.split("#");
        let newData="";
        users.forEach((user)=>{
            if(user.substring(0,user.length-2).toLowerCase()==name.toLowerCase()){
                let newStatus = name+"-N";
                newData+="#"+newStatus;
            }else{
                newData+="#"+user;
            }
        })

        fs.writeFile('users.txt',newData.substring(1),(err)=>{
            console.log(err);
        })
        res.redirect('/')
      });

})


app.post('/inactive',(req,res)=>{
    let name = req.body.name;

    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        
        let users = data.split("#");
        let newData="";
        users.forEach((user)=>{
            if(user.substring(0,user.length-2).toLowerCase()==name.toLowerCase()){
                let newStatus = name+"-A";
                newData+="#"+newStatus;
            }else{
                newData+="#"+user;
            }
        })

        fs.writeFile('users.txt',newData.substring(1),(err)=>{
            console.log(err);
        })
        res.redirect('/')
      });

})

app.listen(PORT,()=>console.log("started...."));