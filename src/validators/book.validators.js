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
      // translatorId: { 
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