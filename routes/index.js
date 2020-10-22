var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    const data = {
        description: `Avanza!!!!`,
        name: "Johan Lindberg",
    };

    res.json(data);
});


module.exports = router;
