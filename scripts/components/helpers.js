const states = {
    error: { add: 'error', remove: 'success' },
    success: { add: 'success', remove: 'error' },
    neutral: { remove: ['error', 'success'] },
};

const setState = (state, ...elements) => {
    for (const element of elements) {
        const { add, remove } = states[state];
        element.classList.add(add);
        element.classList.remove(...[].concat(remove));
    }
};

export const setErrorState = (...elements) => setState('error', ...elements);
export const setSuccessState = (...elements) => setState('success', ...elements);
export const setNeutralState = (...elements) => setState('neutral', ...elements);

export const changeHTML = (e, value) => {
    e.innerHTML = value;
}