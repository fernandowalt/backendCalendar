const { connect } = require("mongoose");

const dbConnection = async () => {
  try {
    await connect(process.env.DB_CNN);

    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("error en la inicializacion de la bd");
  }
};

module.exports = {
  dbConnection,
};
