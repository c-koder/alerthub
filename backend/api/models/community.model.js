const mongoose = require("mongoose");

const communitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    incidents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incident",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);
