const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productsModel = require('../../../src/services/products.service');

const { allProducts, productId1 } = require('./mocks/products.model.mock');

describe('Realiza testes nas funções do produto da camada service', () => {
  test('Testa se função findAll retorna lista com todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves(allProducts);

    const result = await productsModel.findAll();
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(allProducts);
  });

  test('Testa se a função findById retorna o objeto com as informações do produto com o id passado', async () => {
    
  });
});
