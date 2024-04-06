const express = require("express");
const router = express.Router();

const searchCtrl = require("../controllers/searches-controller").searchCtrl;

router.get("/fetchCustomerData", (req, res, next) => {
    searchCtrl.fetchCustomerData(req, res, next);
});

module.exports = router;