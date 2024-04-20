export class Task {
	multiplication = (params) => {
		let result = 0;

		params.forEach((num) => {
			result *= num;
		});

		return result;
	};
}
