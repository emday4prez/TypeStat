function functionReturnsUndefined(): string | undefined {
    return undefined;
}

function functionReturnsNull(): string | null /* todo: null */ {
    return null;
}

function functionGivenNullReturnsUndefined(): string | null | undefined {
    return undefined;
}

function functionGivenUndefinedReturnsNull(): string | undefined | null /* todo: null */ {
    return null;
}

function functionIgnoresInnerMethods(): string {
    (function(): string | undefined {
        return undefined;
    })();

    ((): string | undefined => undefined)();

    return "";
}

const lambdaReturnsUndefined = (): string | undefined => {
    return undefined;
};

const lambdaReturnsNull = (): string | null /* todo: null */ => {
    return null;
};

const lambdaGivenNullReturnsUndefined = (): string | null | undefined => {
    return undefined;
};

const lambdaGivenUndefinedReturnsNull = (): string | undefined | null /* todo: null */ => {
    return null;
};

const lambdaIgnoresInnerMethods = (): string => {
    (function(): string | undefined {
        return undefined;
    })();

    ((): string | undefined => undefined)();

    return "";
};
