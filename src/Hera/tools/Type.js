/**
 * Created by edeity on 2018/1/4.
 */

/**
 * 有一些通用功能,以前是基于jquery,先用Type替代
 * 仅需兼容现代浏览器, 暂不考虑性能
 */
class Type {
    static type(obj) {
        if (obj == null) {
            return obj + "";
        }
    }

    static isObject(obj) {
        return typeof obj === 'object';
    }

    static isNumber(obj) {
        return typeof obj === 'number';
    }

    static isFunction(obj) {
        return typeof obj === "function";
    }

    static isUndefined(obj) {
        return typeof  obj === "undefined";
    }

    static isString(obj) {
        return typeof obj === 'string';
    }
    
    static isArray(obj) {
        return Array.isArray(obj);
    }


    static isPlainObject(obj) {
        var proto, Ctor;

        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }

        proto = Object.getPrototypeOf(obj);

        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) {
            return true;
        }

        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = {}.hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && {}.hasOwnProperty.toString.call(Ctor) === {}.hasOwnProperty.toString.call( Object );
    }

    static extend() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !Type.isFunction(target)) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ( arguments[i] != null) {
                options = arguments[i]
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    copyIsArray = Array.isArray(copy)
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ( Type.isPlainObject(copy) || copyIsArray )) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && Type.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = Type.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }
}

export default Type;