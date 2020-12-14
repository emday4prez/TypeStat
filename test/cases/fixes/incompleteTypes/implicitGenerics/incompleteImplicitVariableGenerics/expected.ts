(function () {
    class Name { }

    let name = new Name();

    let names: T[]<Name> = [];
    names.push(new Name());

    let uniqueNames: Set<T><Name> = new Set();
    uniqueNames.add(name);

    let namesById: Map<K, V><"abc123", Name> = new Map();
    namesById.set('abc123', new Name())

    let idsByName: Map<K, V><Name, 123> = new Map();
    idsByName.set(new Name(), 123);

    // TODO: fix me :)
    let uniqueMaybeNames: Set<T><any> = new Set();
    uniqueMaybeNames.add(idsByName.get(123));

    let uniqueNamesOrBooleans: Set<T><Name | false> = new Set();
    uniqueNamesOrBooleans.add(name);
    uniqueNamesOrBooleans.add(false);
})();
