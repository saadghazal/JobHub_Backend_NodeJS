const Chat = require("../models/Chat");
const User = require("../models/User");

module.exports = {
  accessChat: async (req, res) => {
    const {userId} = req.body

    if(!userId){
        res.status(400).json("Invalid User ID")
    }
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user.id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    }).populate("users", '-password')
    .populate('latestMessage')

    isChat = await User.populate(isChat,{
        path: 'latestMessage.sender',
        select: 'username email profile'
    })

    if(isChat.length > 0){
        res.send(isChat[0])
    }else{
        let chatData = {
            chatName: req.user._id,
            isGroupChat : false,
            users: [
                req.user._id,userId,
            ]
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate('users','-password')
            console.log(fullChat)
            res.status(200).json(fullChat)
        } catch (error) {
            res.status(400).json("Failed to create chat")

        }
    }
  },
  getChat: async (req, res) => {
    try {
      Chat.find({
        users: {
          $elemMatch: {
            $eq: req.user._id,
          },
        },
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "username email profile",
          });
          res.status(200).send(results)
        });
    } catch (error) {
        res.status(500).json("Failed to retrieve chat")
    }
  },
};
