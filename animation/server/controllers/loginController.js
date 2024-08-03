const db = require("../db.js");

exports.signup = async (req, res) => {
    const {regno, pwd} = req.body;
    try {
        db.query('SELECT * FROM user WHERE regno = ?', [regno], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database query error' });
            }

            if(results.length > 0) {
                return res.json({ response : exists });
            }

            if(results.length == 0) {
                db.query('INSERT INTO user (regno, pwd) VALUES (? , ?)', [regno, pwd], (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database query error' });
                    }
                    res.json({ response : true });
                })
            }
            
        });
        
    } catch (error) {
        console.log(error);
    }
}

exports.signin = async (req,res) => {
    const {regno, pwd} = req.query;
    try {
        db.query('SELECT regno, pwd FROM user WHERE regno = ?', [regno], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database query error' });
            }
            console.log(results);
            if( results.length == 0) {
                return res.json({ response : false });
            }
            if(results.length > 0){
                if(results[0].pwd != pwd){
                    return res.json({ response : 'invlaidPWD' });
                }
            }
            return res.json({ response : true });
        });
    } catch (error) {
        console.log(error);
    }
}

