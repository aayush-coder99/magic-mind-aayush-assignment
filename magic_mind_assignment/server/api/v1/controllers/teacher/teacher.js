
import Teacher from '../../models/teacher';
import School from '../../models/school'
import md5 from 'md5'
import Validator from '../validator/validator'


import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export class TeacherController {


 async addTeacher(request, response, next) {
            // Validating Request Body Data
        const { error } = Validator.addTeacherValidation(request.body);
	if (error) {
		return response
			.status(400)
			.send({ success: false, message: error.details[0].message });
	}
            try {
                // Check if teacherName exists already
                const checkTeachers = await Teacher.find({
                    teacherName: request.body.teacherName
                });

                if (checkTeachers.length >= 1) {
                    return response.status(409).send({
                        
                        message: 'Teacher Name (Username) Already Taken!'
                    });
                }
                // Check if schoolId is valid
                const checkSchoolId = await School.find({
                    _id: request.body.schoolId
                });
                if (checkSchoolId.length<1) {
                    return response.status(409).send({
                        success: false,
                        message: 'School ID is Invalid!'
                    });
                }
                //Hashing Password
               // const salt = await md5.genSalt(10);
                const hashedPassword = await md5(request.body.password.trim());
                const newTeacher = new Teacher({
                    _id: mongoose.Types.ObjectId(),
                    teacherName: request.body.teacherName,
                    password: hashedPassword,
                    schoolId: request.body.schoolId
                });
                await newTeacher.save();
                 response.status(201).send({
                    data: newTeacher,
                    message: 'Teacher Registered Successfully!'

                });
            } catch (err) {
                response.status(500).send({ success: false, error: err });
            }
    }
    /**
 * login user 
 * @param {object} request (express request object)
 * @param {function(Error,object)} response - response object.
**/
    async loginTeacher(req, res, next){
        // Validating Query Params
        const { error } = Validator.loginTeacherValidation(req.body);
	if (error) {
		return res
			.status(400)
			.send({ success: false, message: error.details[0].message });
	}
          try {
            // Validating teacher name
            const checkTeachers = await Teacher.find({
                teacherName: req.body.teacherName
            });
            if (checkTeachers.length < 1) {
                return res.status(404).send({
                    success: false,
                    message: 'Teacher Name (Username) is Invalid!'
                });
            }
            // Validating password
            const pwd = md5(req.body.password.trim())
            const actualpwd = checkTeachers[0].password
            const authResult =  md5(req.body.password.trim())==checkTeachers[0].password
                
        
            if (!authResult) {
                return res.status(401).json({
                    success: authResult,
                    message: 'This password is not correct '
                });
            }
            // Generating token
            const privateKey ="supersecret123"
            const token = jwt.sign(
                {
                    _id: checkTeachers[0]._id,
                    teacherName: checkTeachers[0].teacherName
                },
                privateKey,
                {
                    expiresIn: '3h'
                }
            );
            return res.status(200).json({
                success: authResult,
                data: {
                    token: token
                }
            });
        } catch (err) {
            res.status(500).send({ success: false, error: err });
        }
    };
    
    async getAllTeachers(req, res, next){
        try {
            const teachers = await Teacher.find()
                .select('_id teacherName address schoolId')
                .populate('schoolId');
            if (teachers.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'No Teachers Registered in the Database!'
                });
            }
            let transformedOutput = [];
            teachers.map(teacher => {
                transformedOutput.push({
                    _id: teacher._id,
                    teacherName: teacher.teacherName,
                    schoolInfo: {
                        _id: teacher.schoolId._id,
                        schoolName: teacher.schoolId.schoolName,
                        address: teacher.schoolId.address,
                        phoneNum: teacher.schoolId.phoneNum                    }
                });
            });
            res.status(200).send({
                success: transformedOutput.length > 0 ? true : false,
                data: {
                    teachers: transformedOutput,
                    teacherCount: transformedOutput.length
                }
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err });
        }
    }
    
    // List teacher by teacher name
    async  getSingleTeacher(req, res, next) {
        const { error } = Validator.getTeacherValidation(req.query);
        if (error) {
            return res
                .status(400)
                .send({ success: false, message: error.details[0].message });
        }
        try {
            const teacher = await Teacher.findOne({
                teacherName: req.query.teacherName
            })
                .select('_id teacherName schoolId ')
                .populate('schoolId');
    
            if (!teacher) {
                return res.status(404).send({
                    success: false,
                    message: 'Teacher Name Not Found in the Database!'
                });
            }
            res.status(200).send({
                success: true,
                data: {
                    teacher: {
                        _id: teacher._id,
                        teacherName: teacher.teacherName,
                        schoolInfo: {
                            _id: teacher.schoolId._id,
                            schoolName: teacher.schoolId.schoolName,
                            address: teacher.schoolId.address,
                            phoneNum: teacher.schoolId.phoneNum
                        }
                    }
                }
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err });
        }
    };
    
}

export default new TeacherController();
