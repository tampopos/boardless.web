export interface IConfig {
  isMockMode: boolean;
  apiUrl: string;
}
export const config: IConfig = (() => {
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
})();
