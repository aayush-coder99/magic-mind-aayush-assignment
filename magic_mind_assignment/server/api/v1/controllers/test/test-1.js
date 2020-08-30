
import Express from 'express';
import test2 from './test-2';
export default Express
    .Router()
    .get('/test2',test2.data)
    //.get('/getallteachers' ,teacher.getAllTeachers)


