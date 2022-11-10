import { writeFile } from "mz/fs";

import { ProjectDescription } from "../initializeProject/shared";
import { initializeSources } from "../sources";
import { initializeImports } from "./imports";
import { initializeRenames } from "./renames";
import { createJavaScriptConfig } from "./createJavaScriptConfig";

export interface InitializeJavaScriptSettings {
    fileName: string;
    project: ProjectDescription;
}

export const initializeJavaScript = async ({ fileName, project }: InitializeJavaScriptSettings) => {
    const sourceFiles = await initializeSources({ fromJavaScript: true, project });
    const renames = await initializeRenames();
    const imports = await initializeImports();

    const settings = createJavaScriptConfig({ imports, project, sourceFiles, renames });
    await writeFile(fileName, JSON.stringify(settings, undefined, 4));
};
