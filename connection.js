// 1. SETTING UP A CONNECTION \\

const Sequelize = require('sequelize'); // Include Sequelize module

// Create new Sequelize object
const sequelize = new Sequelize('sequelizedb', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  // Max and min connections to db
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

// 2. TEST THE CONNECTION \\

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.'); // Success
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err); // Fail
  });


// 3. CREATE FIRST MODULE \\

const User = sequelize.define('user', { // Create table 'user' with colomn 'firstName' and 'lastName'
firstName: {
    type: Sequelize.STRING
},
lastName: {
    type: Sequelize.STRING
}
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});