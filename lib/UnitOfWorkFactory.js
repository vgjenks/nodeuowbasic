const config = require("../config.json");

const _config = config.Database.development;
let _dbConnection = undefined;

/**
 * NOTE: When used in Express.js, connection pool
 * must be global. Otherwise, connections are not
 * disposed of and accumulate, until failure.
 */
switch (config.DbType) {
	case "mock":
		console.log("Mock data source selected");
		break;
	case "mysql":
		let mysql = require('mysql');
		_dbConnection = mysql.createPool({
			connectionLimit: _config.connectionLimit,
			host: _config.host,
			user: _config.user,
			password: _config.password,
			database: _config.database
		});
		break;
	default:
		throw "ERROR: config.Database.type not defined!";
}

/**
 * Factory abstraction for creating database connection:
 * Use create method in the client and connection will be
 * chosen based on config.
 */
class UnitOfWorkFactory {
	static create(callback) {
		let uow = undefined;
		switch (config.DbType) {
			case "mock":
				let MockUnitOfWork = require("./MockUnitOfWork");
				uow = new MockUnitOfWork();
				return callback(uow);
				break;
			case "mysql":
				let MySqlUnitOfWork = require("./MySqlUnitOfWork");
				_dbConnection.getConnection((err, connection) => {
					if (err) {
						//return callback(err); //TODO: Proper error-handling
						console.log("ERROR: getConnection failed: err = " + err);
					}
					uow = new MySqlUnitOfWork(connection);
					return callback(uow);
				});
				break;
		}
	}
}

module.exports = UnitOfWorkFactory;