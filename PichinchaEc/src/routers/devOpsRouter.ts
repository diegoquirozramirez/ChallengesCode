import * as express from 'express';
import Sender from '../responses/senderResponse';
import {Request, Response} from 'express';
import Responses from '../constants/responses/responseMessage';
import Endpoints from '../constants/endpoints/endpointDevOps';

class DevOpsRouter {
    public route: any;
    constructor(){
        this.route = express.Router();
        this.routerDevops();
    }
    
    private routerDevops(): void {
        this.route.post(Endpoints.devOps.devOps, (req: Request<{}, {}, Sender>, res: Response) => {
            const sender = new Sender(req.body);
            res.json({message: Responses.EXECUTE_OK_SENDER(sender.to)})
        })
    }
}

export default DevOpsRouter;