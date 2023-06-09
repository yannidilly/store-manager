const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../../src/models/products.model");
const productsServices = require('../../../src/services/products.service');

const { allProducts, productId1, newProduct } = require('../mocks/products');

describe('Realiza testes nas funções do produto da camada service', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('Testa se função findAll retorna lista com todos os produtos', async () => {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);

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

  it('Testa se a função findById retorna um erro quando não existe produto com aquele id', async () => {
    sinon.stub(productsModel, 'findById').resolves([]);

    const result = await productsServices.findById(99);

    expect(result.type).to.be.deep.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.deep.equal('Product not found');
  });

  it('Testa se a função createProduct retorna o objeto com as informações do produto criado', async () => {
    sinon.stub(productsModel, 'createProduct').resolves(newProduct);

    const result = await productsServices.createProduct({ name: 'Novo produto' });
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(newProduct);
  })

  it('Testa se a função createProduct retorna um erro se o nome do produto não for passado', async () => {
    sinon.stub(productsModel, 'createProduct').resolves(newProduct);

    const result = await productsServices.createProduct({ id: 1 });
    expect(result.type).to.be.deep.equal('NAME_IS_REQUIRED');
    expect(result.message).to.be.deep.equal('"name" is required');
  })

  it('Testa se a função createProduct retorna um erro se o nome do produto não tiver a quantidade mínima de caracteres', async () => {
    sinon.stub(productsModel, 'createProduct').resolves(newProduct);

    const result = await productsServices.createProduct({ name: 'No' });
    expect(result.type).to.be.deep.equal('NAME_LENGTH_ERROR');
    expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long');
  });
});
