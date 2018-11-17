import { injectable } from 'inversify';
import { IGuidProvider } from 'src/infrastructures/common/services/interfaces/guid-provider';
import { Guid } from 'src/infrastructures/common/guid';

@injectable()
export class GuidProvider implements IGuidProvider {
  public newGuid = () => Guid.newGuid();
}
