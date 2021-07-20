const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      lowercase: true,
      min: 4,
      max: 20,
      unique: true,
      index:true
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      max: 50,
      unique: true,
      index: true
    },
    password: {
      type: String,
      require: true,
      min: 8,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    companions: {                                   // companion is follower
      type: Array,
      default: [],
    },
    admirers: {                                    // admirers is same as poeple user is following
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc:{
      type: String,
      max:100,
    },
    city:{
      type: String,
      max:50,
    },
    homeTown:{
      type: String,
      max:50,
    },
    relationship:{
      type: Number,
      enum: [1,2,3],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
