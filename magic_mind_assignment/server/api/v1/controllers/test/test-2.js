
'use strict';
class Test2 {
    data(req, res, next){
	res.send({
		'test-1-response': {
			success: true,
			message: 'Hello from Test-1 Route'
		},
		'test-2-response': {
            message: "Test2-Response"
        }
	});
}
}
export default new Test2()