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

        SinglyLinkedNodeInterface.implementedBy(this);
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
