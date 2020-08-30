import School from '../../models/school'
import mongoose from 'mongoose'
import Validator from '../validator/validator'

export class SchoolController{

 async registerSchool(req, res, next) {
        //Validating Request Body Data
        const { error } = Validator.registerSchoolValidation(req.body);
        if (error) {
            return res
                .status(400)
                .send({ success: false, message: error.details[0].message });
        }
        try {
            const checkSchools = await School.find({
                schoolName: req.body.schoolName
            });
            if (checkSchools.length >= 1) {
                return res.status(409).send({
                    success: false,
                    message: 'School Name Already Registered!'
                });
            }
            const newSchool = new School({
                _id: mongoose.Types.ObjectId(),
                schoolName: req.body.schoolName,
                address: req.body.address,
                phoneNum: +req.body.phoneNumber.trim()
            });
            await newSchool.save();
            res.status(201).send({
                success: true,
                message: 'School Successfully Registered!'
            });
        } catch (err) {
            res.status(500).send({ success: false, error: err });
        }
    }
    
    // List all schools
    async  getAllSchools(req, res, next){
        
        try {
            const schools = await School.find().select(
                '_id schoolName address phoneNum'
            );
            if (schools.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'No Schools Registered in the Database!'
                });
            }
            res.status(200).send({
                success: schools.length > 0 ? true : false,
                data: {
                    schools: schools,
                    schoolCount: schools.length
                }
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err });
        }
    }
    
    // List school by school name

    async getSingleSchool (req, res, next){
      //  Validating query param
        const { error } = Validator.getSchoolValidation(req.query);
        if (error) {
            return res
                .status(400)
                .send({ success: false, message: error.details[0].message });
        }
        try {
            const school = await School.findOne({
                schoolName: req.query.schoolName
            }).select('_id schoolName address phoneNum');
    
            if (!school) {
                return res.status(404).send({
                    success: false,
                    message: 'School Name Not Found in the Database!'
                });
            }
            res.status(200).send({
                success: true,
                data: {
                    school: school
                }
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err });
        }
    };
}
export default new SchoolController();