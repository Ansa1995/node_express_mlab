//crud operation 
const user = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils/util.js')
const contr = require('../controllers/controllers.js')

module.exports = function(app) {
    //signup
    app.post('/api/signup',async function(req, res){
        contr.signup(req, res)
    }),
    //signin and get token
    app.post('/api/signin',async function(req, res){
        contr.signin(req,res)
    }),
    //profile by using token and reading data
    app.post('/api/profile',async function(req, res){
        contr.profile(req, res)
    }),
    //update using token
    app.post('/api/update',async function(req, res){
        contr.update(req, res)
    }),
    //delete using token
    app.post('/api/delete',async function(req, res){
        contr.delete(req, res)
    })

}