type UserParams = {
	name: string;
	email: string;
	age: number;
};

export class User {
	public email: string;
	public name: string;
	public age: number;

	constructor({ name, email, age }: UserParams) {
		this.name = name;
		this.email = email;
		this.age = age;
	}
}
