// Setting up a connection
const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelizedb', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Create table 'user' with colomn 'firstName' and 'lastName'
const User = sequelize.define('user', {
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