const router = require('express').Router()

router.get('/', (req, res) => {
    const roomName = req.query.roomname ? req.query.roomname : null;
    if(roomName == null) return res.status(500).json({message: "invalid roomname"})
    return res.status(200).json({message: `joined in ${roomName}`})
})

module.exports = router