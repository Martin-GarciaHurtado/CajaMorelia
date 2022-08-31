'use strict';

/**
 * cliente-cuenta service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cliente-cuenta.cliente-cuenta');
