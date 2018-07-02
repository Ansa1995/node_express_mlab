const bcrypt = require('bcrypt')
module.exports = {
    hash: function(password){
      return (bcrypt.hashSync(password,10))
    },
    compare: function(password,password1){
        return (bcrypt.compareSync(password, password1))
      }
}