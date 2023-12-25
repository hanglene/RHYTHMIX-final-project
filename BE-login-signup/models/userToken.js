const mongoose = require('mongoose');

const { Schema } = mongoose;

const userTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // expire after 5 minutes
  }
});

const UserToken = mongoose.model("UserToken", userTokenSchema);

module.exports = UserToken;
