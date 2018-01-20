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
