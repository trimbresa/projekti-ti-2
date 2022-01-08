const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class CustomerRepository extends BaseRepository {
    async createCustomer(userId) {
        const repository = await this.getRepository();
        const {customer} = repository.models;
        return await customer.create({id: uuid(), userId});
    }

    async updateUser() {
        // const repository = await this.getRepository();
        // console.log(User)
        // const dt = await repository.findAll({ where: { id: 1 } });

        // console.log(User);
        return 'welcome';
    }

    async getOne(id) {
        const repository = await this.getRepository();
        const {user, customer} = repository.models;

        const foundItem = await user.findOne({
            where: {
                id
            },
            attributes: ['firstName', 'lastName', 'dob', 'email'],
            include: {
                model: customer,
                attributes: ['avatarUrl']
            }
        });

        return foundItem;
    }
}

module.exports = new CustomerRepository()
