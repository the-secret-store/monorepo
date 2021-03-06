export function getBaseUrl() {
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev && !process.env.REACT_APP_API_URL) {
    throw new Error('REACT_APP_API_URL is not defined');
  }

  return isDev ? 'http://127.0.0.1:3000' : process.env.REACT_APP_API_URL;
}
