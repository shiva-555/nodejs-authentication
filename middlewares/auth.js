import jwt from 'jsonwebtoken'; 

const checkAutorization = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, 'my-secKey');
        console.log(decoded);
    
        if (!decoded) {
            res.status(400).send('please provide valid token');
        }
    
        req.userId = decoded.userId;
        console.log(req.userId);
        next();
    } else {
        res.status(400).send('please provide token');
    }
};

export default {checkAutorization}