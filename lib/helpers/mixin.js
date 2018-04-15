(function() {
  var _, mixin;

  _ = require('underscore');


  /*
    Extends a class with another class.  Klass is the main class and mixinKlass methods and attributes will
    be added to klass and function as full members of that class.
  
    In the context of a mixinKlass method,
      - @ will reference the instance of klass
      - @originalMethod() will always call method replaced by the mixinKlass method
      - mixinKlass attributes will replace attributes in klass
  
    @originalMethod()
      - is a special method that only exists in the context of a mixinKlass method call
      - should reference either the previous mixin that replaced this method or the klass method replaced
      - may be undefined.  if no previous mixin or the klass did not define the mixinKlass method,
        then @originalMethod should be null or undefined.  If you are unsure if the class being mixed into
        will define the mixin method, use the   @originalMethod?(arguments)   pattern (note existensial op)
  
    see,  app/coffeescripts/tests/application/mixin.coffee for examples and expected behaviors.
  
    IMPORTANT NOTES:
  
      Mixin constructor methods override contructor methods in class being mixed into.  Mixins that extend
      other classes get a hidden constructor.  Make sure @originalMethod? is called with the original constructor
      args.   See models/mixins/stylesMetadata.coffee
  
      mixin() <b>must be called last</b> in the class definition or after class is defined such that any overridden
        methods have already been defined.
  
      Parameter passing.  For flexibility, plugins will often pass along arguments to @originalMethod.  If your
        mixin method doesn't specifically require a fixed set of parameters or doesn't care about parameters,
        you should call original method like so:
        <pre>
                    @originalMethod?.apply(@, arguments)
        </pre>
        This will make your mixin more flexible and able to survive changes to the underlying instance method
        argument specification.
  
    example:
  
        class MyMixin
          someMethod: () =>
            @originalMethod()
             * ... do something more useful
  
        class MyClass
          someMethod: () =>
             * do something useful
  
          mixin @, MyMixin     #  this needs to be last
   */

  module.exports = mixin = function(klass, mixinKlass) {
    var base, base1, base2, key, mixinKlassName, oMethod, oMethodKey, ref, results, val, wrapperDef, wrapperName;
    if (!mixinKlass) {
      console.trace();
      throw "Dev: Mixin class undefined. Make sure you are correctly requiring file.";
    }
    if (klass === window || klass === document) {
      throw "Dev: The class being mixed into should not be window or document. <p>Look closely at the indentation of 'mixin(@, ... )' callsite.  If using '@' for first parameter it must be at the same indentation as the instance method definitions in the class at the very end of the class definition.</p>";
    }
    mixinKlassName = mixinKlass.toString().match(/^\s*function\s*([^\(]*)/)[1] || "unknown";
    ref = mixinKlass.prototype;
    results = [];
    for (key in ref) {
      val = ref[key];
      if (key === 'constructor') {
        continue;
      }
      if (_.isFunction(val) && (_.isEmpty(_.keys(val)) || key === 'constructor')) {
        oMethod = klass.prototype[key];
        oMethodKey = mixinKlassName + "_" + key;
        (base = klass.prototype).__originalMethods || (base.__originalMethods = {});
        klass.prototype.__originalMethods[oMethodKey] = oMethod;
        (base1 = klass.prototype).__mixinMethods || (base1.__mixinMethods = {});
        klass.prototype.__mixinMethods[oMethodKey] = val;
        (base2 = klass.prototype).__originalMethodStack || (base2.__originalMethodStack = []);
        wrapperName = oMethodKey + "__wrapperFn";
        wrapperDef = "klass.prototype[key] = function() {\n  this.__originalMethodStack.push(this.originalMethod)\n  this.originalMethod = this.__originalMethods['" + oMethodKey + "']\n  returnValue = this.__mixinMethods['" + oMethodKey + "'].apply(this, arguments)\n  this.originalMethod = this.__originalMethodStack.pop()\n  return returnValue\n}";
        results.push(eval(wrapperDef));
      } else {
        results.push(klass.prototype[key] = val);
      }
    }
    return results;
  };

}).call(this);
