const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');

const { allProducts, productId1 } = require('../mocks/products');

describe('Realiza testes nas funções do produto da camada model', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('Testa se função findAll retorna lista com todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves(allProducts);

    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProducts);

  });

  it('Testa se a função findById retorna o objeto com as informações do produto com o id passado', async () => {
    sinon.stub(connection, 'execute').resolves(productId1);

    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(productId1);

  });
});
