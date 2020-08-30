import Express from 'express';
import controller from './teacher';
import teacher from './teacher';
export default Express
    .Router()
    .post('/login', teacher.loginTeacher)
    .post('/addteacher' , teacher.addTeacher)
    .get('/getteacher',teacher.getSingleTeacher)
    .get('/getallteachers' ,teacher.getAllTeachers)


