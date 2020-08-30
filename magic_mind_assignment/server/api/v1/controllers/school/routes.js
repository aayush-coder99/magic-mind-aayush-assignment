import Express from 'express';
//import controller from './teacher';
import school from './school';
export default Express
    .Router()
    //.post('/login', teacher.login)
    .post('/registerschool' , school.registerSchool)
    .get('/getallschools',school.getAllSchools)
    .get('/getschool' , school.getSingleSchool)
