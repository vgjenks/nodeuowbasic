class MySqlUnitOfWork {
	constructor(connection) {
		this.connection = connection;
	}

	query(query, params, callback) { //command
		this.connection.beginTransaction((err) => {
			this.connection.query(query, params, (err, result) => {
				if (err) this.connection.rollback(); //TODO: Proper error-handling
				return callback(result);
			});
		});
	}

	complete() {
		this.connection.commit((err) => { //TODO: Proper error-handling
			this.connection.release();
		});
	}
}

module.exports = MySqlUnitOfWork;