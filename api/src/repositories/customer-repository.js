const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class CustomerRepository extends BaseRepository {
    async createCustomer(userId) {
        const repository = await this.getRepository();
        const {customer} = repository.models;
        return await customer.create({id: uuid(), userId});
    }
    
    async updateCustomer(newData) {
        const repository = await this.getRepository();
        const {customer} = repository.models;
        console.log({newData})
        const updatedCustomer = await customer.update(
                newData,
                {
                    where: {
                        id: newData.id
                    }
                }
            )
        ;

        return updatedCustomer;
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
                attributes: ["id", 'avatarUrl']
            }
        });

        return foundItem;
    }
}

module.exports = new CustomerRepository()
