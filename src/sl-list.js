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
