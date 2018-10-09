import { injectable } from 'inversify';
import { Guid } from 'src/common/guid';
import { IGuidProvider } from './interfaces/guid-provider';

@injectable()
export class GuidProvider implements IGuidProvider {
  public newGuid = () => Guid.newGuid();
}
