import bcrypt from "bcryptjs"

const users =[
    {
        name:"Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456' , 10),
        isAdmin :true
    },
    {
        name:"Majdi Mokhtar",
        email: "majdi@gmail.com",
        password: bcrypt.hashSync('123456' , 10),
    },
    {
        name:"Donia Mokhtar",
        email: "donia@gmail.com",
        password: bcrypt.hashSync('123456' , 10),
    },

]


export default users