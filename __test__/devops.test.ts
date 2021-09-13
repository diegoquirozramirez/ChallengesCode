'use strict';
import DevOpsController from '../src/controllers/devopsController';
const mockReqBody = {
  "message": "This is a test",
	"to": "Juan Perez",
	"from": "Rita Asturia",
	"timeToLifeSec": 45
}
const mockMessageError = {message: "Hello Juan Perez your message will be send"};
const jwtMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiVGhpcyBpcyBhIHRlc3QiLCJ0byI6Ikp1YW4gUGVyZXoiLCJmcm9tIjoiUml0YSBBc3R1cmlhIiwidGltZVRvTGlmZVNlYyI6NDUsImlhdCI6MTYzMTQ5NTcwMywiZXhwIjoxNjMxNDk1NzQ4fQ.H7kGvG05heynJSRfIvJDaPuYIrEJ69qlNM6AE_w5d80";
const apiKeyMock = "2f5ae96c-b558-4c7b-a590-a501ae1c3f6c";
const callbackOk = () => {return {message: "Hello Juan Perez your message will be send"}}
const callbackError = () => {return { message: 'ERROR', detail: 'jwt expired' }}
const devopController = jest.fn((payload: Object, jwt: any, api: any)=> {
  return callbackOk();
});

describe('Sender DevOps', () => {
  it('It is a function', () => {
    expect(typeof DevOpsController.getDevOps).toBe('function')
  });
  describe('Should send payload request', () => {
    const result = DevOpsController.getDevOps(mockReqBody, jwtMock, apiKeyMock);
    it('Should return expired', () => {        
      expect(result).toEqual(callbackError())      
    })
    it('Shold return message', () => {
      const resultOk = devopController(mockReqBody, jwtMock, apiKeyMock);
      expect(JSON.stringify(resultOk)).toBe(JSON.stringify(mockMessageError))
    })
  })
});