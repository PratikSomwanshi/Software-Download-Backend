const { Software } = require("../model");
const CrudRepository = require("./crud.repository");

class SoftwareRepository extends CrudRepository {
    constructor() {
        super(Software);
    }

    async get(query) {
        const software = await Software.find({
            $or: [
                { name: new RegExp(query, "i") },
                { description: new RegExp(query, "i") },
                { builtBy: new RegExp(query, "i") },
                { platform: new RegExp(query, "i") },
                { os: new RegExp(query, "i") },
                { latestVersion: new RegExp(query, "i") },
            ],
        });
        return software;
    }
}

module.exports = SoftwareRepository;
