const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc:{                           // description
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        video: {
            type: String,
        },
        Agree:{                                    // agree is same as like
            type: Array,
            Default:[],
        },
        Remarks: {                                // same as comments
            type: String,                         // remember to add discord (disgreement) instead of dislike
            max: 300,
        }
    }
)




module.exports= mongoose.model("Post", PostSchema);
