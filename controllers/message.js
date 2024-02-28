const Chat = require('../models/Chat')
const Message = require("../models/Message");
const User = require("../models/User");

module.exports = {
  getAllMessages: async (req, res) => {
    try {
    } catch (error) {}
  },
  sendMessage: async (req, res) => {
    const { content, chatId, receiver } = req.body;

    if (!content || !chatId) {
      
      res.status(400).json("Invalid Data");
      return;
    }

    let newMessage = new Message({
      sender: req.user._id,
      content: content,
      receiver: receiver,
      chat: chatId,
    });

    try {
      let message = await Message.create(newMessage);

      message = await message.populate("sender", "username profile email");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "username profile email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage: message})

      return res.json(message)
    } catch (error) {
        res.status(400).json(error)
    }
  },
};
