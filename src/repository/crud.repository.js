const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/AppError");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const software = new this.model(data);
        await software.save();
        return software;
    }

    async getAll() {
        const software = await this.model.find();
        return software;
    }

    async update(id, data) {
        const software = await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!software) {
            return new AppError("Software not found", StatusCodes.BAD_REQUEST);
        }

        return software;
    }

    async delete(id) {
        const software = await this.model.findByIdAndDelete(id);
        if (!software) {
            return new AppError("Software not found", StatusCodes.BAD_REQUEST);
        }

        return software;
    }
}

module.exports = CrudRepository;
