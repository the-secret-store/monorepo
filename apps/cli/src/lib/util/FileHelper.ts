import * as fs from 'fs';
import * as readline from 'readline';

export class FileHelper {
  /**
   * Parses a JSON file from Equals representation of Key-Value pair
   */
  static async parseJsonFromEqualsRepresentationFile(filePath: string) {
    let data: Record<string, string>;

    const fileStream = fs.createReadStream(filePath);

    const lines = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of lines) {
      if (line.trim() === '') continue;

      const keyValuePair = line.split('=');
      data[keyValuePair[0].trim()] = keyValuePair[1].trim();
    }

    fileStream.close();
    return data;
  }

  static writeToFile(filePath: string, content: string) {
    const envFile = fs.createWriteStream(filePath);
    envFile.write(content);
    envFile.close();
  }
}
