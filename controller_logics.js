const Model = require('./mongo_atlas/schema_model')

const getAllProductsStatic = async (req, res) => {
    const products = await Model.find()
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}
    if (featured) queryObject.featured = featured === 'true' ? true : false;
    if (company) queryObject.company = company;
    if (name) queryObject.name = { $regex: name, $options: 'i' };
    if (numericFilters) {
        const operatormap = {
            ">": "$gt",
            "<": "$lt",
            ">=": "$gte",
            "<=": "$lte",
            "=": "$eq"
        }
        let filters = numericFilters.replace(
            /\b(>|<|>=|<=|=)\b/g,
            (match) => `-${operatormap[match]}-`
        )
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        });
    }
    let result = Model.find(queryObject)
    if (sort) {
        const sortlist = sort.split(',').join(' ')
        result = result.sort(sortlist)
    } else {
        result = result.sort('createdAt')
    }
    // const products = await result // for manual approch of select functionality
    if (fields) {
        // const [value_1, value_2] = fields.split(',')
        // const newproducts = products.map(product => {
        //     return { [value_1]: product[value_1], [value_2]: product[value_2] }
        // })

        const fieldslist = fields.split(',').join(' ')
        result = result.select(fieldslist);
    }


    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({ nbHits: products.length, products })
}


module.exports = { getAllProducts, getAllProductsStatic }