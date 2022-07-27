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
        await customer.save();
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

const getCustomerById = async (req, res) => {

    const id = req.params.id;
    const customer = await Customer.findById(id);

    if (!customer){
        res.status(422).json('Not Found');
        return
    }

    res.status(200).json({customer});
}

const sumOfDegrees = async (req, res) => {
<<<<<<< HEAD
=======
    let addScoreToCustomers = '';
>>>>>>> d1551d97b2cc4e648457cd126b054cb655906560
    let customers = await Customer.aggregate([
        {
            $project: {
                "_id": "$_id",
                "name": "$name",
                "sex": "$sex",
                "healthIssues": "$healthIssues",
                sumOfDegrees: {$sum: "$healthIssues.degree"}
            }
        },
        { $sort: {sumOfDegrees: -1 } },
        { $limit: 10 }
    ])
    
<<<<<<< HEAD
    let addScoreToCustomers = customers;
=======
    addScoreToCustomers = customers;
>>>>>>> d1551d97b2cc4e648457cd126b054cb655906560

    for (let i = 0; i < customers.length; i++){
        let score = (1 / (1 + 2.71-(-2.8 + customers[i].sumOfDegrees ))) * 100;
        addScoreToCustomers[i].score = score;
    }
    res.json(addScoreToCustomers);
}

module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    getCustomerById,
    sumOfDegrees
};