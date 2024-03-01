const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

module.exports = {
  getAllMessages: async (req, res) => {
    try {
      const pageSize = 12; //Number of messages per page
      const page = req.query.page || 1; // Current page number

      // Calculate the messages to skip
      const skipMessages = (page - 1) * pageSize;

      /// Find Messages with pagination
      let messages = await Message.find({ chat: req.params.id })
        .populate("sender", "username profile_image email")
        .populate("chat")
        .sort({ createdAt: -1 })// Sort Messages Descending
        .skip(skipMessages)
        .limit(pageSize);
        
        messages = await User.populate(messages,{
          path: 'chat.users',
          select: 'username profile_image email'
        })
        res.json(messages)
    } catch (error) {
      res.status(500).json({
        error: 'Could not retrieve messages'
      });
    }
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

      message = await message.populate("sender", "username profile_image email");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "username profile_image email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

      return res.json(message);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
