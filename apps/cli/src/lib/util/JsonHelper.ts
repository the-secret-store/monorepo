import * as fs from 'fs';
import { FileNotFoundError } from '../errors';

export class JsonHelper {
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
  static importJson(filePath: string) {
    let file: unknown;
    if (!fs.existsSync(filePath)) {
      throw new FileNotFoundError(filePath);
    }

    import(filePath).then(fileContent => (file = fileContent));
    return file;
  }

  /**
   * Write Json
   */
  static writeJson(filePath: string, jsonObject: Record<string, unknown>) {
    fs.writeFileSync(filePath, JsonHelper.prettyJson(jsonObject));
  }
}
