define(function (require) {
  var Handlebars = require('handlebars');

  function addPoo (context, options) {
    return context + 'poo';
  }

  Handlebars.registerHelper('addPoo', addPoo);
  return addPoo;
});
