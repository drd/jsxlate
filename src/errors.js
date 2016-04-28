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
    const dupes = Object.keys(map).filter(
        key => map[key] > 1
    );
    assertInput(dupes.length === 0,
        `${description}: ${dupes}`,
        node
    );
}
