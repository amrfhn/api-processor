'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leads = sequelize.define('Leads', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    comments: DataTypes.STRING
  }, {});
  Leads.associate = function(models) {
    // associations can be defined here
  };
  return Leads;
};