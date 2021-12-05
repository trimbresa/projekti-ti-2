const BaseRepository = require("./base-repository");

class UserRepository extends BaseRepository {
    async createUser() {
        const repository = await this.getRepository();
        const {user, address, customer} = repository.models;

        const createdUser = await user.create({id: 1, firstName: 'Trim', lastName: 'Bresa'});
        await customer.create({id: 3, userId: createdUser.id});

        return "aasdas";
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
