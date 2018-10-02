export interface Config {
  isMockMode: boolean;
  apiUrl: string;
}

const createConfig = (): Config => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return {
        isMockMode: Boolean(process.env.REACT_APP_TEST_MOCK_MODE),
        apiUrl: String(process.env.REACT_APP_TEST_API_URL),
      };
    case 'production':
      return {
        isMockMode: Boolean(process.env.REACT_APP_PROD_MOCK_MODE),
        apiUrl: String(process.env.REACT_APP_PROD_API_URL),
      };
  }
  return {
    isMockMode: Boolean(process.env.REACT_APP_DEV_MOCK_MODE),
    apiUrl: String(process.env.REACT_APP_DEV_API_URL),
  };
};

const getConfig = () => {
  const c = createConfig();
  if (!c.isMockMode || !window || !window.location) {
    return c;
  }
  c.apiUrl = `${window.location.protocol}//${window.location.hostname}:3001`;
  return c;
};

export const config = getConfig();
