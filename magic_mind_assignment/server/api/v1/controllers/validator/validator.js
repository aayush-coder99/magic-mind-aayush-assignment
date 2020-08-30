'use strict';
import Joi from 'joi'

/* School Validations */
class Validator{
    registerSchoolValidation(data){
	const schema = Joi.object({
		schoolName: Joi.string().required(),
		address: Joi.string().required(),
		phoneNumber: Joi.string().min(7).required() // Shortest Phone Number is of 7 digits
	});
	return schema.validate(data);
}

getSchoolValidation(data){
	const schema = Joi.object({
		schoolName: Joi.string().required()
	});
	return schema.validate(data);
}

/* Teacher Validations */
addTeacherValidation(data) {
	const schema = Joi.object({
		teacherName: Joi.string().required(),
		password: Joi.string().min(6).required(),
		schoolId: Joi.string().min(24).required() // MongoDB Object ID must be 24 characters long
	});
	return schema.validate(data);
}

loginTeacherValidation ( data) {
	const schema = Joi.object({
		teacherName: Joi.string().required(),
		password: Joi.string().required()
	});
	return schema.validate(data);
}

getTeacherValidation(data) {
	const schema = Joi.object({
		teacherName: Joi.string().required()
	});
	return schema.validate(data);
}

/* Student Data and Marks Validation */
addStudentDataValidation (data) {
	const schema = Joi.object({
		studentName: Joi.string().required(),
		class: Joi.number().required(),
		roll: Joi.number().required(),
		schoolId: Joi.string().min(24).required(), // MongoDB Object ID must be 24 characters long
		totalMarks: Joi.number().required()
	});
	return schema.validate(data);
}
}
export default new Validator();

