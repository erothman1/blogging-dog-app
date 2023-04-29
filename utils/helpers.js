const { User } = require("../models/index")
module.exports = {
    formatDate: (date) => {
        return date.toLocaleDateString()
    },
    // getUsername: async (user) => {
    //     const data = await User.findOne({
    //         where: {
    //             user_id: user 
    //         }
    //     })
    //     const username = data.username
    //     return username
    // }
}