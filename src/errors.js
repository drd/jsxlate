/*
 *  Error type & handling, assertions
 */

class InputError extends Error {
    constructor(description, node) {
        super(description);

        Object.assign(this, {
            description,
            node,
            inputError: true
        });
    }
}

export function assertInput(condition, description, node) {
    if (!condition) {
        throw new InputError(description, node);
    }
}

export function assertUnique(map, description, node) {
    const dupes = Object.entries(map).filter(
        ([_, value]) => value > 1     // eslint-disable-line no-unused-vars
    );
    assertInput(dupes.length === 0,
        `${description}: ${dupes}`,
        node
    );
}
