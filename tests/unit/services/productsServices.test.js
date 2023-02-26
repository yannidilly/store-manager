const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../../src/models/products.model");
const productsServices = require('../../../src/services/products.service');

const { allProducts, productId1 } = require('../mocks/products');

describe('Realiza testes nas funções do produto da camada service', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('Testa se função findAll retorna lista com todos os produtos', async () => {
    sinon.stub(productsModel, 'findById').resolves([allProducts]);

    const result = await productsServices.findAll();
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(allProducts);
  });

  it('Testa se a função findById retorna o objeto com as informações do produto com o id passado', async () => {
    sinon.stub(productsModel, 'findById').resolves([productId1]);

    const result = await productsServices.findById(1);
    
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(productId1);
  });

  it('Testa se a função findById retorna um erro quando o id passado não está com o formato correto', async () => {
    sinon.stub(productsModel, 'findById').resolves([productId1]);

    let result = await productsServices.findById('id string');
    expect(result.type).to.be.deep.equal('INVALID_VALUE');
    expect(result.message).to.be.deep.equal('"id" must to be a number');

    result = await productsServices.findById(1.5);
    expect(result.type).to.be.deep.equal('INVALID_VALUE');
    expect(result.message).to.be.deep.equal('"id" must to be a number');

    result = await productsServices.findById(0);
    expect(result.type).to.be.deep.equal('INVALID_VALUE');
    expect(result.message).to.be.deep.equal('"id" must to be a number');

    result = await productsServices.findById();
    expect(result.type).to.be.deep.equal('INVALID_VALUE');
    expect(result.message).to.be.deep.equal('"id" must to be a number');
  });
});
