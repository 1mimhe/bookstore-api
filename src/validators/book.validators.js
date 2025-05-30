const ajv = require("../config/ajv.config");

function addTitleValidator() {
  const schema = {
    type: 'object',
    removeEmpty: true,
    properties: {
      name: {
        type: 'string',
        minLength: 3
      },
      slug: {
        type: 'string',
        toSlug: true,
        minLength: 3
      },
      authorIds: {
        type: 'array',
        commaSeparatedIntegers: true,
        items: {
          type: 'integer',
          minimum: 1
        },
        minItems: 1,
        uniqueItems: true
      },
      summary: { 
        type: 'string'
      },
      originallyPublishedAt: { 
        type: 'string',
        format: 'date'
      },
      tags: {
        type: 'array',
        commaSeparatedIntegers: true,
        items: {
          type: 'string',
          minimum: 1
        },
        minItems: 1,
        uniqueItems: true
      },
    },
    required: ['name', 'authorIds'],
  };

  return ajv.compile(schema);
}

function editTitleValidator() {
  const schema = {
    type: 'object',
    removeEmpty: true,
    properties: {
      name: {
        type: 'string',
        minLength: 3
      },
      slug: { 
        type: 'string',
        toSlug: true,
        minLength: 3
      },
      summary: { 
        type: 'string'
      },
      originallyPublishedAt: { 
        type: 'string',
        format: 'date'
      },
      tags: {
        type: 'array',
        commaSeparatedIntegers: true,
        items: {
          type: 'string',
          minimum: 1
        },
        minItems: 1,
        uniqueItems: true
      },
    },
  };

  return ajv.compile(schema);
}

const quartos = [
  'vaziri',
  'roqee',
  'jibi',
  'rahli',
  'kheshti',
  'paltoyi',
  'sultani'
];

const covers = [
  'shoomiz',
  'kaqazi',
  'sakht',
  'charmi'
];

function addBookValidator() {
  const schema = {
    type: 'object',
    removeEmpty: true,
    properties: {
      name: {
        type: 'string',
        minLength: 1 
      },
      anotherName: {
        type: 'string'
      },
      titleId: { 
        type: 'integer',
        minimum: 1 
      },
      languageId: {
        type: 'integer'
      },
      ISBN: { 
        type: 'string'
      },
      quarto: { 
        type: 'string',
        enum: quartos
      },
      cover: { 
        type: 'string',
        enum: covers
      },
      pagesNumber: {
        type: 'integer',
        minimum: 0
      },
      publishedAt: {
        type: 'string',
        format: 'date'
      },
      publishSeries: {
        type: 'integer',
        minimum: 0
      },
      weight: { 
        type: 'number',
        minimum: 0
      },
      stock: { 
        type: 'integer',
        minimum: 0
      },
      price: { 
        type: 'number',
        minimum: 0
      },
      bookImages: {
        type: 'array',
        decodeUrlArray: true,
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['main', 'back', 'inside', 'cover']
            },
            url: {
              type: 'string',
              format: 'uri',
              minLength: 1
            }
          }
        }
      },
      translatorIds: {
        type: 'array',
        commaSeparatedIntegers: true,
        items: {
          type: 'integer',
          minimum: 1
        },
        minItems: 1,
        uniqueItems: true
      },
      publisherId: { 
        type: 'integer',
        minimum: 1
      }
    },
    required: ['name', 'titleId', 'publisherId'],
  };

  return ajv.compile(schema);
}

function editBookValidator() {
  const schema = {
    type: 'object',
    removeEmpty: true,
    properties: {
      name: {
        type: 'string',
        minLength: 1 
      },
      anotherName: {
        type: 'string'
      },
      languageId: {
        type: 'integer'
      },
      ISBN: { 
        type: 'string'
      },
      quarto: { 
        type: 'string',
        enum: quartos
      },
      cover: { 
        type: 'string',
        enum: covers
      },
      pagesNumber: {
        type: 'integer',
        minimum: 0
      },
      publishedAt: {
        type: 'string',
        format: 'date'
      },
      publishSeries: {
        type: 'integer',
        minimum: 0
      },
      weight: { 
        type: 'number',
        minimum: 0
      },
      stock: { 
        type: 'integer',
        minimum: 0
      },
      price: { 
        type: 'number',
        minimum: 0
      },
      // publisherId: { 
      //   type: 'integer',
      //   minimum: 1
      // },
      // translatorIds: { 
      //   type: 'integer',
      //   minimum: 1,
      // }
    },
  };

  return ajv.compile(schema);
}


module.exports = {
  addTitleValidator,
  editTitleValidator,
  addBookValidator,
  editBookValidator
}