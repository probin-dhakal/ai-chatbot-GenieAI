import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: [
    {
      prompt: {
        type: String,
      },
      response: {
        type: String,
      },
    },
  ],
 
},{timestamps: true});

const Message = mongoose.model("Message", messageSchema);
export default Message;
