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
     'use strict';

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
         if (!Interface.prototype.isPrototypeOf(inherits[i])) {
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
 Interface.prototype = {
     implementedBy: function(object) {
         'use strict';

         var methods = this.methods;
         for (var i = 0, li = methods.length; i < li; ++i) {
             if ('function' !== typeof object[methods[i]]) {
                 throw new Error('Interface<' + name + '> requires the method ' + methods[i]);
             }
         }
         return true;
     },
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

(function(global) {
    'use strict';

    /**
     * NodeInterface defines the required methods for a class that implements
     * this interface.
     *
     * @type {Interface}
     */
    var NodeInterface = new Interface('NodeInterface', [
        'setValue',
        'getValue',
    ]);

    global.NodeInterface = NodeInterface;
})(this);

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

(function(global) {
    'use strict';

     /**
      * SinglyLinkedNodeInterface defines the required methods for a class that
      * implements this interface.
      *
      * @type {Interface}
      */
    var SinglyLinkedNodeInterface = new Interface('NodeInterface', [
        'setNextNode',
        'getNextNode',
    ], [NodeInterface]);

    global.SinglyLinkedNodeInterface = SinglyLinkedNodeInterface;
})(this);

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

(function(global) {
    'use strict';

    /**
     * LinkedListInterface defines the required methods for a class that
     * implements this interface.
     *
     * @type {Interface}
     */
    var LinkedListInterface = new Interface('LinkedListInterface', [
        'getNode',
        'createNode',
    ], [ListInterface]);

    global.LinkedListInterface = LinkedListInterface;
})(this);

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
 * Variant of a Node that links in one direction
 *
 * @param {*} value Value the node should carry
 * @constructor
 * @implements {NodeInterface}
 */
function Node(value)
{
    'use strict';

    this.value = value;

    NodeInterface.implementedBy(this);
}

Node.prototype = {
    /**
     * Retrieves the value contained within the node
     * @return {*}
     */
    getValue: function() {
        'use strict';

        return this.value;
    },

    /**
     * Sets the value contained within the node
     * @param  {*} value
     * @chainable
     */
    setValue: function(value) {
        'use strict';

        this.value = value;
        return this;
    }
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

(function(global) {
    'use strict';

    /**
     * Variant of a Node that links in one direction
     *
     * @param {*} value Value the node should carry
     * @constructor
     * @implements {SinglyLinkedNodeInterface}
     */
    function SinglyLinkedNode(value)
    {
        Node.call(this, value);
        this.nextNode = null;

        SinglyLinkedNode.implementedBy(this);
    }

    /**
     * Establish the prototype chain
     * @type {Node}
     */
    SinglyLinkedNode.prototype = new Node(null);

    /**
     * Gets the next node in the chain
     * @return {SinglyLinkedNodeInterface}
     */
    SinglyLinkedNode.prototype.getNextNode = function() {
        return this.nextNode;
    };

    /**
     * Sets the next node in the chain
     * @param  {SinglyLinkedNodeInterface} node
     * @chainable
     */
    SinglyLinkedNode.prototype.setNextNode = function(node) {
        if (null !== node) {
            SinglyLinkedNodeInterface.implementedBy(node);
        }
        this.nextNode = node;
        return this;
    };

    global.SinglyLinkedNode = SinglyLinkedNode;
})(this);

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
 * Creates a singly-linked list data structure
 *
 * @constructor
 * @implements {LinkedListInterface}
 */
function SinglyLinkedList()
{
    'use strict';
    this.headNode = null;

    LinkedListInterface.implementedBy(this);
}

SinglyLinkedList.prototype = {
    /**
     * Inserts a new value at the requested index. If no index is provided, then
     * assumes that the value should be inserted at the end of the data
     * structure.
     *
     * @param  {*} value
     * @param  {integer=} index
     *
     * @chainable
     */
    insert: function(value, index) {
        'use strict';

        // validate paramters
        if (0 === arguments.length) {
            throw new Error('SinglyLinkedList.insert requires at least one argument');
        }

        if (1 === arguments.length) {
            index = null;
        }

        if (null !== index && +index !== (+index|0)) { // convert to integer
            throw new Error('SinglyLinkedList.insert expects index to be integer, null, or undefined');
        }

        // business logic
        var node = new SinglyLinkedNode(value);
        if (null === index && null === this.headNode) {
            this.headNode = node;
            return this;
        }

        if (null === index) {
            this.getLastNode().setNextNode(node);
            return this;
        }

        if (0 === +index) {
            node.setNextNode(this.headNode);
            this.headNode = node;
            return this;
        }

        var previousNode = this.getNode(index - 1);
        node.setNextNode(previousNode.getNextNode());
        previousNode.setNextNode(node);
        return this;
    },

    /**
     * Retrieves a value from the identified index
     *
     * @param  {integer} index
     * @return {*} value stored at the index
     */
    get: function(index) {
        'use strict';

        // check parameters
        if (0 === arguments.length) {
            throw new Error('SinglyLinkedList.get requires one argument');
        }

        // business logic
        return this.getNode(index).getValue();
    },

    /**
     * Updates a value at the identified index
     *
     * @param  {integer} index
     * @param  {*} value
     *
     * @chainable
     */
    set: function(index, value) {
        'use strict';

        // check parameters
        if (2 !== arguments.length) {
            throw new Error('SinglyLinkedList.set expects two arguments');
        }

        // business logic
        this.getNode(index).setValue(value);
        return this;
    },

    /**
     * Removes "count" nodes, starting from the identified index
     *
     * @param  {integer} index
     * @param  {integer=} count (default: 1)
     *
     * @chainable
     */
    remove: function(index, count) {
        'use strict';

        // check parameters
        if (0 === arguments.length) {
            throw new Error('SinglyLinkedList.remove requires 1 or 2 arguments');
        }
        if (1 === arguments.length) {
            count = 1;
        }
        if (1 > count) {
            throw new Error('SinglyLinkedList.remove requires count parameter to be greater than 0');
        }
        if (+count !== (+count)|0) {
            throw new Error('SinglyLinkedList.remove expected count paramter to be an integer');
        }

        // business logic
        var nextNode = this.getNode(index + count - 1).getNextNode();
        if (0 === +index) {
            this.headNode = nextNode;
            return this;
        }

        this.getNode(index - 1).setNextNode(nextNode);
        return this;
    },

    /**
     * Counts the number of nodes in the linked list
     *
     * @return {integer}
     */
    count: function() {
        'use strict';

        var node = this.headNode;
        var count = 0;
        while (node) {
            node = node.getNextNode();
            ++count;
        }
        return count;
    },

    /**
     * Retrieves the node at the identified index
     *
     * @param  {integer} index
     * @return {SinglyLinkedNodeInterface}
     *
     * @protected
     */
    getNode: function(index) {
        'use strict';

        var node = this.headNode;
        for (var i = 0; i < index; ++i) {
            node = node.getNextNode();
            if (!node) {
                throw new Error("Expected index to be within length of the list");
            }
        }
        return node;
    },

    /**
     * Retrieves the last node in the structure
     *
     * @return {SinglyLinkedNodeInterface}
     *
     * @protected
     */
    getLastNode: function() {
        'use strict';

        var node = this.headNode;
        while (node && node.getNextNode()) {
            node = node.getNextNode();
        }
        return node;
    },
};
