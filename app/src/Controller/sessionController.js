let users =[]
function signup(req,res) {
    let firstname = req.body.firstname
    let email = req.body.email
    let password = req.body.password
    
    let user = {
        "firstname":firstname,
        "email":email,
        "password":password
    }
    users.push(user)

    res.json({"msg":"SignUpDone",data:user,rcode:200})
}
function getAllUsers(req,res){
    res.json({msg:"Alluser",rcode:200,data:users})    
}
function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let user = users.find((user) => user.email == email);
    if (user && user.password == password) {
        res.json({ msg:"Login successfull", rcode: 200, data: user });
    }
    else{
        res.json({ "msg":"Invalid email or password", rcode: 401 });
    }  
}
  
module.exports.signup=signup
module.exports.getAllUsers=getAllUsers
module.exports.login=login