const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const ProfileSchema = new Schema(
{   user:{
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    username :{
        type : String,
        required: true,
        max: 20,
    },
    country: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    education : [{
        school:{
            type: String,
            required: true,
        },
        from: {
            type: Date,
            required: true,
        },
        to:{
            type: Date,
            required: true
        },
        description:{
            type: String
        },
    }],
    skills: {
        type: [String],
        required: true,
      },
  
    bio: {
        Type: String,
    },
     experience:[
        { title:
         {
            type: String,
            required: true,
          },
          company: {
            type: String,
            required: true,
          },
          location: {
            type: String,
          },
          from: {
            type: Date,
            required: true,
          },
          to: {
            type: Date,
            required: true,
          },
          description: {
            type: String,
          },
        },
  
    ],
    socials: {
        linkedIn:{
            type: String,
        },
        github: {
            type: String,
          },
    }
    },
    {
        timestamps: true,
      }
    
    
    );




    module.exports = mongoose.model("profiles", ProfileSchema);
