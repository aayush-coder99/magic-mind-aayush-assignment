import Express from 'express';
//import controller from './teacher';
import student from './student';
import authenticate from '../../middleware/authentication'
export default Express
    .Router()
      .post('/addstudentdata' ,authenticate, student.addStudent)
    .get('/getallstudents',student.getAllStudents)