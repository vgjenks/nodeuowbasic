const UnitOfWork = require("./lib/UnitOfWorkFactory");
// const MockData = require("./service/MockData");
const MovieData = require("./service/MovieData");

//mock data
// let db = UnitOfWork.create((uow) => {
// 	let data = new MockData(uow);
// 	data.getAll((result) => {
// 		result.forEach(movie => console.log(movie.title));
// 	});
// 	uow.complete();
// });

//real data
let db = UnitOfWork.create((uow) => {
	let data = new MovieData(uow);
	data.getAll((result) => {
		result.forEach(movie => console.log(movie.title));
	});
	uow.complete();
});
