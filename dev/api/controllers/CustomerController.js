const Customer = require('../model/Customer');

const createCustomer = async (req, res) => {

    const name = req.body.name;
    const birthDate = req.body.birthDate;
    const sex = req.body.sex;
    const healthIssues = req.body.healthIssues;

    const customer = new Customer({
        name:name,
        birthDate:birthDate,
        sex:sex,
        healthIssues:healthIssues
    })

    try{
        const newCustomer = await customer.save();
        res.status(201).json('Customer created')
    }catch(error){
        res.status(400).json(error);
    }
}

const getAllCustomers = async (req, res) => {

    try{
        const customers = await Customer.find().sort();
        res.status(200).json({
          customers: customers,
        })
    }catch(error){
        res.status(400).json(error);
    }
}

const updateCustomer = async (req, res) => {

    const { id } = req.params;
    const newCustomer = req.body;

    try{
        const result = await Customer.findByIdAndUpdate(id, newCustomer);
        res.status(200).json(newCustomer);
    }catch(error){
        res.status(400).json(error);
    }
}

module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer
};
