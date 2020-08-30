import teacherRouter from './api/v1/controllers/teacher/routes';
import schoolRouter from './api/v1/controllers/school/routes'
import studentRouter from './api/v1/controllers/student/routes'
import testRouter from './api/v1/controllers/test/test-1'

/*
 *
 *
 * @export
 * @param {any} app
 */
export default function routes(app) {
    
    app.use('/v1/teacher', teacherRouter);
    app.use('/v1/school',schoolRouter)
    app.use('/v1/student',studentRouter)
    app.use('/v1/test1',testRouter)

    return app;
}