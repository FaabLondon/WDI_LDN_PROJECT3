const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});

//to protect our users passwords 
userSchema.set('toJSON', {
  transform(doc, json){
    delete json.password;
    return json;
  }
});

//.this refer to the User object
userSchema.virtual('passwordConfirmation')
  .set(function setpasswordConfirmation(passwordConfirmation){
    //I create _passwordConfirmation variable and use "_" just to remind myself that temp variable
    this._passwordConfirmation = passwordConfirmation;
  });

//1) password confirmation check
//Middleware - pre-validation hook - checks data before validating data
//.isModified (when modify passwrod in DB) and .invalidate come from Mongoose
userSchema.pre('validate', function checkPasswordMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

//2) hash password
userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){ //need to check again as user could only be changing the email in DB
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

//check that plain text password matches password in DB
userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password); //this.password is the password stored in DB
};

module.exports = mongoose.model('User', userSchema);
