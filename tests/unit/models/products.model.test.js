const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');

const { allProducts } = require('./mocks/products.model.mock');

describe('Realiza testes nas funções do produto da camada model', () => {
  test('Testa se função findAll retorna lista com todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves(allProducts);

    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProducts);

  });

  test('Testa se a função findById retorna o objeto com as informações do produto com o id passado', () => {

  });
});