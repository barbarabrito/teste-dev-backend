const {Router} = require('express');

const router = Router();

const {getAllCustomers, createCustomer, updateCustomer} = require('../controllers/CustomerController');

router.post('/customers', createCustomer);
router.get('/customers', getAllCustomers);
router.put('/customers/:id', updateCustomer);

module.exports = router;