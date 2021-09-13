import Sender from '../responses/senderResponse';
import Responses from '../constants/responses/responseMessage';
var Jwt = require('jsonwebtoken');

class DevopsController {
    getDevOps(payload: Object, jwt: any, apiKey: any) {
        try {
            const sender = new Sender(payload);
            //var decoded = Jwt.sign({...sender}, req.headers['x-parse-rest-api-key'], { expiresIn: '45s' });
            var decoded = Jwt.verify(jwt, apiKey);
            return {message: Responses.EXECUTE_OK_SENDER(sender.to), decoded}
        } catch (error) {
            return {message: Responses.EXECUTE_ERROR_SENDER, detail: error.message}
        }
    }
}

export default new DevopsController();