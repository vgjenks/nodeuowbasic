class MovieData {
	constructor(uow) {
		this.uow = uow;
	}

	getAll(callback) {
		this.uow.query("select * from movie", [], (result) => {
			return callback(result);
		});
	}

	getByID(userID, callback) {
		this.uow.query("select * from movie where movie_id = ?", [userID], (result) => {
			return callback(result);
		});
	}

	getByName(title, callback) {
		this.uow.query("select * from movie where title = ?", [title], (result) => {
			return callback(result);
		});
	}

	getCount(callback) {
		this.uow.query("select count(*) as count from movie", [], (result) => {
			return callback(result);
		});
	}

	create(movie, callback) {
		let query = "insert into movie (title, description, year_released) values(?, ?, ?)";
		this.uow.query(query, [movie.title, movie.description, movie.year_released], (result) => {
			return callback(result);
		});
	}

	update(movieId, movie, callback) {
		let query = "update movie set title = ?, description = ?, year_released = ? where movie_id = ?";
		this.uow.query(query, [movie.title, movie.description, movie.year_released, movieId], (result) => {
			return callback(result);
		});
	}

	delete(movieId, callback) {
		this.uow.query("delete from movie where movie_id = ?", [movieId], (result) => {
			return callback(result);
		});
	}
}

module.exports = MovieData;