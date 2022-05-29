import * as fs from 'fs';
import * as fsp from 'fs/promises';

export class JsonHelper {
  /**
   * Prettifies a JSON object / string.
   */
  static prettyJson(json: Record<string, unknown> | string, removeQuotes = false) {
    const prettifiedJson = JSON.stringify(
      typeof json === 'string' ? JSON.parse(json) : json,
      null,
      '\t'
    );
    return removeQuotes
      ? prettifiedJson.replace(/(?<!\\)"/g, '').replace(/\\(?!!")/g, '')
      : prettifiedJson;
  }

  /**
   * Imports a JSON file synchronously
   */
  static importJsonSync(filePath: string, createIfNotFound = false) {
    if (createIfNotFound && !fs.existsSync(filePath)) {
      console.debug('Config file not found, creating an empty config file...');
      fs.writeFileSync(filePath, '{}');
    }

    let json: Record<string, unknown>;

    import(filePath).then(fileContent => {
      json = fileContent;
    });

    return json;
  }

  /**
   * Imports a JSON file asynchronously
   */
  static writeJson(filePath: string, object: Record<string, unknown>) {
    return fsp.writeFile(filePath, JsonHelper.prettyJson(object));
  }
}
