export function prettyPrint(obj: Record<string, unknown> | Array<unknown>) {
  if (Array.isArray(obj)) {
    return `[${obj.map(prettyPrint).join(', ')}]`;
  }

  const prettifiedJson = JSON.stringify(obj, null, '\t');
  return process.env.NODE_ENV === 'test'
    ? prettifiedJson
    : prettifiedJson.replace(/(?<!\\)"/g, '').replace(/\\(?!!")/g, '');
}
