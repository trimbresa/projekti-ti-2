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

    async updateUser(newData) {
        const repository = await this.getRepository();
        const {user} = repository.models;
        return await user.update(
                newData,
                {
                    where: {
                        id: newData.id
                    }
                }
            )
        ;
    }
}

module.exports = new UserRepository()
