import * as express from 'express';
import Sender from '../responses/senderResponse';
import {Request, Response} from 'express';
import Responses from '../constants/responses/responseMessage';
import Endpoints from '../constants/endpoints/endpointDevOps';
import DevOpsController from '../controllers/devopsController';
var Jwt = require('jsonwebtoken');

class DevOpsRouter {
    public route: any;
    constructor(){
        this.route = express.Router();
        this.routerDevops();
    }
    
    private routerDevops(): void {
        this.route.post(Endpoints.devOps.devOps, (req: Request<{}, {}, Sender>, res: Response) => {
            try {                
                res.json(DevOpsController.getDevOps(req.body, req.headers['x-jwt-kwy'], req.headers['x-parse-rest-api-key']))
            } catch (error) {
                res.json({message: Responses.EXECUTE_ERROR_SENDER, detail: error.message})
            }
        })     
    }
}

export default DevOpsRouter;