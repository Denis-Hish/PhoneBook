module.exports = (sequelize, Sequelize) => {
  const ContactDetails = sequelize.define(
    'phones',
    {
      userName: { type: Sequelize.STRING },
      phoneNumber1: { type: Sequelize.STRING },
      phoneNumber2: { type: Sequelize.STRING },
      phoneNumber3: { type: Sequelize.STRING },
      group: { type: Sequelize.STRING },
    },
    { timestamps: true }
  );
  return ContactDetails;
};
