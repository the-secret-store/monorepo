import * as fs from 'fs';

export class Helpers {
  /**
   * Returns a prettified string representation of the object
   */
  static prettyJson(jsonObject: object, removeQuotes = false) {
    const prettifiedJson = JSON.stringify(jsonObject, null, '\t');
    return removeQuotes
      ? prettifiedJson.replace(/(?<!\\)"/g, '').replace(/\\(?!!")/g, '')
      : prettifiedJson;
  }

  /**
   * Imports a file and returns the contents as the file
   */
  static importFile(filePath: string) {
    let file: unknown;
    if (!fs.existsSync(filePath)) {
      throw new Error(`${filePath} not found`);
    }

    import(filePath).then(fileContent => (file = fileContent));
    return file;
  }

  /**
   * Write Json
   */
  static writeJson(filePath: string, jsonObject: Record<string, unknown>) {
    fs.writeFileSync(filePath, Helpers.prettyJson(jsonObject));
  }
}
