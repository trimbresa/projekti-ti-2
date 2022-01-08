const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class UserRepository extends BaseRepository {
    async createUser(newUser) {
        const {firstName = '', lastName = '', email, password} = newUser;
        const repository = await this.getRepository();
        const {user} = repository.models;

        const createdUser = await user.create({id: uuid(), firstName, lastName, email, password});

        return createdUser;
    }

    async getUser(email) {
        const repository = await this.getRepository();
        const {user} = repository.models;

        const foundUser = await user.findOne({
            where: {
                email
            }
        });
        return foundUser;
    }

    async updateUser() {
        // const repository = await this.getRepository();
        // console.log(User)
        // const dt = await repository.findAll({ where: { id: 1 } });

        // console.log(User);
        return 'welcome';
    }
}

module.exports = new UserRepository()
