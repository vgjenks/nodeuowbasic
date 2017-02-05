/**
 * Unit Tests:
 * Uses nodeunit: https://github.com/caolan/nodeunit
 * 1. npm install -g nodeunit
 * 2. cd to 'tests' dir
 * 3. nodeunit UoWTests.js
 */
const test = require("nodeunit");
const UnitOfWork = require("../lib/UnitOfWorkFactory");
const MovieData = require("../service/MovieData");

exports.testSelectAllUsers = function(test) {
	let db = UnitOfWork.create((uow) => {
		let data = new MovieData(uow);
		data.getAll((result) => {
			test.expect(1);
			test.ok(result.length > 0, "Should return at least one record");
			uow.complete();
			test.done();
		});
	});
};

exports.testSelectSingleUser = function(test) {
	let db = UnitOfWork.create((uow) => {
		let data = new MovieData(uow);
		data.getByID(1, (result) => {
			test.expect(1);
			test.ok(result.length == 1, "Should return exactly one record");
			uow.complete();
			test.done();
		});
	});
};

exports.testSelectUserCount = function(test) {
	let db = UnitOfWork.create((uow) => {
		let data = new MovieData(uow);
		data.getCount((result) => {
			let recordCount = result[0].count;
			test.expect(1);
			test.ok(recordCount >= 1, "Should return total record count: " + recordCount);
			console.log(`Record count: ${recordCount}`)
			test.done();
			uow.complete();
		});
	});
};

exports.testCreate = function(test) {
	let db = UnitOfWork.create((uow) => {
		let newMovie = {
			title: "The Last Boyscout",
			description: "Bruce is a badass.",
			year_released: 1991
		};
		let data = new MovieData(uow);
		data.create(newMovie, (result) => {
			let affected = result.affectedRows;
			let newId = result.insertId;
			let testPass = affected == 1 && newId > 0;
			test.expect(1);
			test.ok(testPass,
				`Should have inserted one new record. affected = ${affected}, newId = ${newId} `);
			console.log(`Success: affected = ${affected}, newId = ${newId} `)
			uow.complete();
			test.done();
		});
	});
};

exports.testUpdateUser = function(test) {
	let db = UnitOfWork.create((uow) => {
		let data = new MovieData(uow);
		data.getByName("The Last Boyscout", (result) => {
			if (result.length > 0) {
				let movie = result[0];
				let id = movie.movie_id;
				console.log(`Found: id = ${id}`)
				movie.title = "Unit Test Updated";
				data.update(id, movie, (result) => {
					let affected = result.affectedRows;
					test.expect(1);
					test.ok(affected == 1, "Should have updated one record: " + affected);
					console.log(`Rows affected: ${affected}`)
					test.done();
				});
			}
			uow.complete();
		});
	});
};

exports.testDelete = function(test) {
	let db = UnitOfWork.create((uow) => {
		let data = new MovieData(uow);
		data.getByName("Unit Test Updated", (result) => {
			if (result.length > 0) {
				let id = result[0].movie_id;
				console.log(`Found: id = ${id}`)
				data.delete(id, (result) => {
					let affected = result.affectedRows;
					test.expect(1);
					test.ok(affected == 1, `Should have deleted one record. affected = ${affected}`);
					console.log(`Rows affected: ${affected}`)
					test.done();
				});
			}
			uow.complete();
		});
	});
};
