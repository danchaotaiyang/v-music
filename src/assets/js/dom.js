export const hasClass = (el, className) => {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
};

export const addClass = (el, className) => {
    if (hasClass(el, className)) {
        return;
    }
    let newClassName = el.className.split(' ');
    newClassName.push(className);
    el.className = newClassName.join(' ');
};

export const getData = (el, name, value) => {
    const prefix = 'data-';
    name = prefix + name;
    if (value) {
        return el.setAttribute(name, value);
    } else {
        return el.getAttribute(name);
    }
};

let elementStyle = document.createElement('div').style;

let vendor = (() => {
    let transformNames={
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };
    for (let k in transformNames) {
        if (elementStyle[transformNames[k]] !== undefined) {
            return k;
        }
    }
    return false;
})();


export const prefixStyle = style => {
    if (!vendor) {
        return false;
    }
    if (vendor === 'standard') {
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
};
