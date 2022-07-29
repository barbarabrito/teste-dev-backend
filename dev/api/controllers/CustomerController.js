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

    if (!name){
        res.status(400).json('Customer\'s name is required');
        return
    }

    if(!birthDate){
        res.status(400).json('Customer\'s date of birth is required');
        return
    }

    if(!sex){
        res.status(400).json('Customer\'s sex is required');
        return
    }

    if(healthIssues){

        for (let i = 0; i < healthIssues.length; i++){
            
            if ( !((healthIssues[i].degree == 1) || (healthIssues[i].degree == 2))){
                res.status(400).json('Health issues degree should only be 1 or 2');
                return
            }
        }
    }

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

    if(newCustomer.healthIssues){

        for (let i = 0; i < newCustomer.healthIssues.length; i++){
            
            if ( !((newCustomer.healthIssues[i].degree == 1) || (newCustomer.healthIssues[i].degree == 2))){
                res.status(400).json('Health issues degree should only be 1 or 2');
                return
            }
        }
    }

    try{
        await Customer.findByIdAndUpdate(id, newCustomer);
        res.status(200).json(newCustomer);
    }catch(error){
        res.status(400).json(error);
    }
}

const getCustomerById = async (req, res) => {

    const id = req.params.id;
    const customer = await Customer.findById(id);

    if (!customer){
        res.status(404).json('Not Found');
        return
    }

    res.status(200).json({customer});
}

const sumOfDegrees = async (req, res) => {

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
    
    let addScoreToCustomers = customers;

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