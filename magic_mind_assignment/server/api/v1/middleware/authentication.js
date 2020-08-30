'use strict';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {

	try {
        const privateKey ="supersecret123"
		const token = req.headers.token;
        const decoded = jwt.verify(token, privateKey);
		req.teacherData = decoded;
		next();
	} catch (err) {
		res.status(401).json({
			success: false,
			message:
				'You are Unauthorized to access this feature, kindly Login and Retry!'
		});
	}
};
