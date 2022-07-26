const {Router} = require('express');

const router = Router();

const { getAllCustomers, createCustomer, updateCustomer, getCustomerById, sumOfDegrees } = require('../controllers/CustomerController');

router.post('/customers', createCustomer);
router.get('/customers', getAllCustomers);
router.put('/customers/:id', updateCustomer);
router.get('/customers/:id', getCustomerById);
router.get('/higher-risk/customers', sumOfDegrees);

module.exports = router;