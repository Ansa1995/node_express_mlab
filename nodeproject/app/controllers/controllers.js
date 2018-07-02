const user = require('../models/user.js')
const utils = require('../utils/util.js')
const service =  require('../service/services')
module.exports = {
    //signup
    signup: async function(req, res){
        try{
            console.log(req.body)
            var username = await req.body.username
            var email = await req.body.email
            var password = await req.body.password
            //var hash1 = utils.hash(password)
            var hash1 = utils.hash(password)
            var userData = await new user({
                username : username,
                email : email,
                password : hash1
            })
            service.signup(req, res, email, userData)    
        }
        catch (err){
            res.json({'msg':'failed'})
        }

    },
    //signin and get token
    signin: async function(req,res){
        try
        {
            var email = await req.body.email
            var password = await req.body.password
            service.signin(req, res, email, password)
        }
        catch (err){
            res.send('error')
        }
    },
    //profile by using token and reading data
    profile: async function(req, res){
        try{
            var token = await req.headers['x-access-token']
            if(!token){
                res.json({'status':'success','msg':'token not present'})
            }
            else{
                
                service.profile(req, res, token)
            }

        }
        catch (err){
            res.send('failed')
        }
    },
    update:async function(req, res){
        try{
            var token = await req.headers['x-access-token']
            var username = await req.body.username
            var password = await req.body.password
            var hash1 = utils.hash(password)
            if(!token){
                res.json({'status':'success','msg':'token not present'})
            }
            else{
                service.update(req, res, token, username, hash1)
            }

        }
        catch (err){
            res.send('failed')
        }
    },
    delete:async function(req, res){
        try{
            var token = await req.headers['x-access-token']
            if(!token){
                res.json({'status':'success','msg':'token not present'})
            }
            else{
                service.delete(req, res, token)
            }

        }
        catch (err){
            res.send('failed')
        }
    }
}