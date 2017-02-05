class MockUnitOfWork {
	constructor(connection) {
		this.db = [
			{ id: 1, title: "Gladiator", description: "The Romans were brutal!", year_released: 2000 },
			{ id: 2, title: "Fight Club", description: "Crazy guy beats himself up.", year_released: 1999 },
			{ id: 3, title: "The Big Lebowski", description: "That's just like...your opinion, man.", year_released: 1998 },
			{ id: 4, title: "Titanic", description: "Leo dies in the end.", year_released: 1997 },
			{ id: 5, title: "Jerry Maguire", description: "You had me at Hello World!", year_released: 1996 },
			{ id: 6, title: "Toy Story", description: "Falling with style.", year_released: 1995 },
		];
		console.log("ctor: Mock data created");
	}

	query(query, params, callback) {
		console.log("query(): Queried mock db");
		return callback(this.db.filter((row) => {
			if (row.title.indexOf(query) > -1) {
				return true;
			} else {
				return false;
			}
		}));
	}

	complete() {
		console.log("commit(): Mock transaction committed");
	}

}

module.exports = MockUnitOfWork;
