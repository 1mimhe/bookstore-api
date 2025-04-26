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
      summary: { 
        type: 'string'
      },
      originallyPublishedAt: { 
        type: 'string',
        format: 'date'
      }
    },
    required: ['name', 'slug'],
    additionalProperties: false,
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
      }
    },
    additionalProperties: false
  };

  return ajv.compile(schema);
}

function bookValidator() {
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
      titleId: { 
        type: 'integer',
        minimum: 1 
      }
      // publisherId: { 
      //   type: 'integer',
      //   minimum: 1
      // },
      // translatorId: { 
      //   type: 'integer',
      //   minimum: 1,
      // }
    },
    required: ['name', 'titleId'],
    additionalProperties: false,
  };

  return ajv.compile(schema);
}

module.exports = {
  addTitleValidator,
  editTitleValidator,
  bookValidator
}