
/**
 * Module dependencies.
 */

var Emitter    = require('emitter')
  , Enumerable = require('enumerable');

/**
 * Expose `Collection`.
 */

module.exports = createCollection;

/**
 * Create a new collection constructor for a model, or
 * use new Collection(models); to create a collection.
 *
 * @param {Array|Function} Model
 * @api public
 */

function createCollection (Model) {

  function Collection(models) {
    this.models = models || [];
  }

  // Check for constructor case
  if (this instanceof createCollection) return new Collection(Model);

  Collection.prototype.Model = Model;
  return Collection;
}


/**
 * Mixin enumerable.
 */

Enumerable(Collection.prototype);

/**
 * Mixin emitter.
 */

Emitter(Collection.prototype);

/**
 * Iterator implementation.
 */

Collection.prototype.__iterate__ = function(){
  var self = this;
  return {
    length: function(){ return self.length() },
    get: function(i){ return self.models[i] }
  }
};

/**
 * Return the collection length.
 *
 * @return {Number}
 * @api public
 */

Collection.prototype.length = function(){
  return this.models.length;
};

/**
 * Add `model` to the collection and return the index.
 *
 * @param {Object} model
 * @return {Number}
 * @api public
 */

Collection.prototype.push = function(model){
  this.models.push(model);
  this.emit('push', model);
  return this.models.length;
};

/**
 * Remove `model` from the collection.
 *
 * @param {Object} model
 * @api public
 */

Collection.prototype.remove = function(model){
  var index = this.models.indexOf(model);
  if (index > -1) {
    this.models.splice(index, 1);
    this.emit('remove', model);
  }
};