/* */ 
"format cjs";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @whatItDoes Represents a type that a Component or other object is instances of.
 *
 * @description
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @stable
 */
export var /** @type {?} */ Type = Function;
/**
 * @param {?} v
 * @return {?}
 */
export function isType(v) {
    return typeof v === 'function';
}
//# sourceMappingURL=type.js.map