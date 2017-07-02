/**
 * MIT License
 *
 * Copyright (c) 2017 Steven Jimenez
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Interface Constructor Class
 *
 * JavaScript does not have a robust concept of class inheritance, and that
 * prevents it from programmatically enforcing interfaces/abstract classes.
 * This class emulates this behavior with some standardized Duck Typing to
 * check whether an object at least implements the functions we expect to
 * see in an object. If it implements all of the methods, we can assume
 * that it implements the interface.
 *
 * @param {string}       name     Internal name for the interface in error messages
 * @param {string[]=}    methods  Array of method names the interface should check for
 * @param {Interface[]=} inherits Interface Objects to extend for this interface
 *
 * @constructor
 */
function Interface(name, methods, inherits)
{
    // ensure that the constructor at least defines an interface name
    if (!arguments.length) {
        throw new Error('Attempted to create Interface without a name.');
    }

    // allow empty interfaces
    if (!methods || !methods.length) {
        methods = [];
    }

    // allow null-inheritance
    if (!inherits || !inherits.length) {
        inherits = [];
    }

    var _methods = [], i, li;

    // make sure that all of our method names are strings
    for (i = 0, li = methods.length; i < li; ++i) {
        if ('string' !== typeof methods[i]) {
            throw new Error('Interface<' + name + '> method<' + i + '> name is <' + typeof methods[i] + '>; expected string');
        }
        _methods.push(methods[i]);
    }

    // make sure that we include all of our method names in the interface
    for (i = 0, li = inherits.length; i < li; ++i) {
        if (Interface !== Object.getPrototypeOf(inherits[i]).constructor) {
            throw new Error('Interface<' + name + '> attempted to implement non-Interface interface');
        }
        _methods = _methods.concat(inherits[i].methods);
    }

    // attach the methods in a way that doesn't allow them to be updated
    Object.defineProperties(this, {
        'name': { value: name },
        'methods': { value: Object.freeze(_methods) }
    });
}

/**
 * Duck Types an object to determine whether it implements all of the methods
 * from the Interface.
 *
 * @param  {Object} object Object to check the interface against
 * @return {boolean} true or throws an error
 */
Interface.prototype.implementedBy = function(object) {
    var methods = this.methods;
    for (var i = 0, li = methods.length; i < li; ++i) {
        if ('function' !== typeof object[methods[i]]) {
            throw new Error('Interface<' + name + '> requires the method ' + methods[i]);
        }
    }
    return true;
};

/**
 * MIT License
 *
 * Copyright (c) 2017 Steven Jimenez
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

 /**
  * NodeInterface defines the required methods for a class that implements this
  * interface.
  *
  * @type {Interface}
  */
 var NodeInterface = new Interface('NodeInterface', [
     'setValue',
     'getValue',
 ]);
