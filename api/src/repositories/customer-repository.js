const BaseRepository = require("./base-repository");

class CustomerRepository extends BaseRepository {
    async createCustomer() {
        const repository = await this.getRepository();
        const {user} = repository.models;

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

module.exports = new CustomerRepository()
