export class Task {
	multiplication = (params) => {
		let result = 1;

		params.forEach((num) => {
			result = result * num;
		});

		return result;
	};
}
