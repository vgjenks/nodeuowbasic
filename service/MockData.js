class MockData {
	constructor(uow) {
		this.uow = uow;
	}

	getAll(callback) {
		this.uow.query("e", [], (result) => {
			return callback(result);
		});
	}
}

module.exports = MockData;
