interface FetchRequest<T extends {} = {}> {
  body: T;
  relativeUrl: string;
  methodName: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
