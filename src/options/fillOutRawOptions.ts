import { processLogger } from "../logging/logger";
import { convertObjectToMap } from "../shared/maps";
import { RawTypeStatOptions, TypeStatOptions } from "./types";

export const fillOutRawOptions = (rawOptions: RawTypeStatOptions, fileNames?: ReadonlyArray<string>): TypeStatOptions => {
    return {
        fileNames,
        fixes: {
            incompleteTypes: false,
            noImplicitAny: false,
            strictNullChecks: false,
            ...rawOptions.fixes,
        },
        logger: processLogger,
        projectPath: rawOptions.projectPath === undefined
            ? "tsconfig.json"
            : rawOptions.projectPath,
        typeAliases: rawOptions.typeAliases === undefined
            ? new Map()
            : convertObjectToMap(rawOptions.typeAliases),
    };
};
