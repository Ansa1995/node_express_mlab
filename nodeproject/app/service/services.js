const user = require('../models/user.js')
const utils = require('../utils/util.js')
const jwt = require('jsonwebtoken')
module.exports = {
    //signup//
    signup: function(req, res, email, userData){
        user.findOne({email:email} ,function(err, docs){
            if (docs==null){

                userData.save().then(
                    item => {
                        res.send('Success')
                    }
                )

            }
            else 
            {
                res.json({'msg':'user exist'})
            }
        })
    },
    //signin and create token
    signin:function(req, res, email, password){
        user.findOne({email:email},function(err, docs){
            if(err)
            {
                res.json({'status':'error','msg':'db_error'})
            }
            else if(docs==null)
            {
                res.json({'status':'error','msg':'user not found'})
            }
            else
            {
                var cmp = utils.compare(password, docs.password)
                if(cmp) {

                    const token = jwt.sign({ email: email },'secret', {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.json({'status':'success','msg':token})

                }
                else
                {
                    res.json({'status':'error','msg':'password mismatch'})
                }


            }
        })


    },
    //profile by using token and reading data
    profile:function(req, res, token){
        jwt.verify(token,'secret',function(err,decoded){
            if(err)
            {
                res.json({'status':'success','msg':'token authentication failed'})
            }
            else
            {
                user.find({email:decoded.email},function(err,docs){
                    if(err)
                    {
                        res.json({'status':'success','msg':'db error'})
                    }
                    else if(docs==null){
                        res.json({'status':'success','msg':'no such user found'})
                    }
                    else{
                        res.json({'status':'success','msg':docs})
                    }
                })
            }
        })
    },
    update:async function(req, res, token, username, hash){
        jwt.verify(token,'secret',function(err,decoded){
            if(err)
            {
                res.json({'status':'success','msg':'token authentication failed'})
            }
            else
            {
                user.find({email:decoded.email},function(err,docs){
                    if(err)
                    {
                        res.json({'status':'error','msg':'db error'})
                    }
                    else if(docs==null){
                        res.json({'status':'error','msg':'no such user found'})
                    }
                    else{
                        user.update({email:decoded.email}, {$set:{username:username,password:hash}}, function (err, docs) {
                            if (err) 
                            {
                                res.json({'status':'error','msg':'cant update'})
                            }
                            else if(docs==null)
                            {
                                res.json({'error':'success','msg':'no user found'})
                            }
                            else{
                                res.json({'status':'success','msg':'updated'})
                            }
                            
                        });
                    }
                })
            }
        })
    },
    delete:async function(req, res, token){
        jwt.verify(token,'secret',function(err,decoded){
            if(err)
            {
                res.json({'status':'success','msg':'token authentication failed'})
            }
            else
            {
                user.find({email:decoded.email},function(err,docs){
                    if(err)
                    {
                        res.json({'status':'error','msg':'db error'})
                    }
                    else if(docs==null){
                        res.json({'status':'error','msg':'no such user found'})
                    }
                    else{
                        user.deleteOne({email:decoded.email}, function (err, docs) {
                            if (err) 
                            {
                                res.json({'status':'error','msg':'db error'})
                            }
                            else if(docs==null)
                            {
                                res.json({'error':'success','msg':'cant delete'})
                            }
                            else{
                                res.json({'status':'success','msg':'deleted'})
                            }
                            
                        });
                    }
                })
            }
        })
    }

}