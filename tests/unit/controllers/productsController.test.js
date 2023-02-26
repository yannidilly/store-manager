const chai = require('chai');
const { expect } = chai; // apenas uma desestruturação para na parte dos testes não ter que escrever chai.expect todas as vezes
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const productService = require('../../../src/services/products.service');
const { allProducts, productId1 } = require('../mocks/products');
const serviceResponse = require('../mocks/serviceResponses');
const productController = require('../../../src/controllers/products.controller');

describe('Realiza testes nas funções do produto da camada controller', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('Testa se função findAll retorna lista com todos os produtos', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'findAll').resolves(serviceResponse.findAll);

    await productController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Testa se a função findById retorna o objeto com as informações do produto com o id passado', async () => {
 
  });
});
