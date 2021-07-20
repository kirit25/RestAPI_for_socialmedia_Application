const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//update user
router.put("/:id", async(req, res)=> {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,
                {$set: req.body,
            });
            res.status(200).json("Account has been updated")   
        }catch(err) {
            return res.status(500).json(err);
        }
    }else {
        return res.status(403).json("You can update only your account!");
    }
});
//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });
//get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updateAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err);
    }
});
//companion a user
router.put("/:id/companion", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.companions.includes(req.body.userId)){
                await user.updateOne({ $push: { companions:req.body.userId}});
                await currentUser.updateOne({ $push: {  admirers:req.params.id}});
                res.status(200).json("user has become your companion")
            }else{
                res.status(403).json("you already companion with this user")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cant follow yourself");
    }
})
//uncompanion a user
router.put("/:id/uncompanion", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.companions.includes(req.body.userId)) {
          await user.updateOne({ $pull: { companions: req.body.userId } });
          await currentUser.updateOne({ $pull: { admirers: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });
  module.exports = router;
