import { AddResultExpress } from '../../src/controllers/add-result-express'
import { BimesterResult } from '../../src/entity/bimester-result'
import { CreateResult } from '../../src/services/create-result'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-mock'
import { type Request, type Response } from 'express'

describe('AddResultExpress Controller', () => {
  test('1. should calls next with the error if service throws', async () => {
    // System under test
    const entity = new BimesterResult()
    const repo = new BimesterRepositoryStub()
    const service = new CreateResult(entity, repo)
    jest.spyOn(service, 'execute').mockImplementation(() => { throw new Error() })
    const sut = new AddResultExpress(service)
    const bodyReq = {
      bimester: 'PRIMEIRO',
      discipline: 'Climatologia',
      grade: 10
    }
    const mReq = {
      body: bodyReq
    } as unknown as Request
    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn()
    } as unknown as Response
    const mNext = jest.fn()

    await sut.execute(mReq, mRes, mNext)
    expect(mNext).toBeCalledWith(new Error())
  })
})
