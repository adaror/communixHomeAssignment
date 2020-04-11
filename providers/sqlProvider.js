const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'users', 
    'root', 
    'WordLife123', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false
    },
    pool: {
      max: 30,
      min: 5,
      idle: 10000
    }
  });

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING, 
    },
    lastName: {
        type: Sequelize.STRING, 
    },
    nickName: {
        type: Sequelize.STRING, 
    },
    password: {
        type: Sequelize.STRING, 
    },
    email: {
        type: Sequelize.STRING, 
    }   
});

const validateUserByEmailAndPassword = async(userEmail, userPassword) => {
    try {
        const result = await Users.findOne({ where: { email: userEmail } });
        if (!result) return false;
        
        return result.password === userPassword;
    } catch(err) {
        console.error(err);
    }
}
//{firstName, lastName, nickName, password, email}
const registerUser = async(req) => {
    try {
        const {firstName, lastName, nickName, password, email} = req.body;
        const isAllParamsExists = firstName && lastName && nickName && password && email;
        const isUserExists = await Users.findOne({ where: { email } });
        if (isUserExists || !isAllParamsExists) throw new Error('user exists or missing parameter');
        
        const result = await Users.create({
            firstName,
            lastName,
            nickName,
            password,
            email
        })
        return result;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    validateUserByEmailAndPassword,
    registerUser
}

