'use strict'
module.exports = {
  up: async function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'email', Sequelize.TEXT).then(function () {
      return queryInterface.addColumn('Users', 'password', Sequelize.TEXT).catch(function (error) {
        if (error.message === "ER_DUP_FIELDNAME: Duplicate column name 'password'" || error.message === 'column "password" of relation "Users" already exists') {
          // eslint-disable-next-line no-console
          console.log('Migration has already run… ignoring.')
        } else {
          throw error
        }
      })
    }).catch(function (error) {
      if (error.message === 'SQLITE_ERROR: duplicate column name: email' || error.message === "ER_DUP_FIELDNAME: Duplicate column name 'email'" || error.message === 'column "email" of relation "Users" already exists') {
        // eslint-disable-next-line no-console
        console.log('Migration has already run… ignoring.')
      } else {
        throw error
      }
    })
  },

  down: async function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'email').then(function () {
      return queryInterface.removeColumn('Users', 'password')
    })
  }
}
