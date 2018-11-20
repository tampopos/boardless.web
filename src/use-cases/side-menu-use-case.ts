import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { ISideMenuOperators } from 'src/infrastructures/stores/side-menu/operators-interface';
import { ISideMenuUseCase } from './interfaces/side-menu-use-case';

@injectable()
export class SideMenuUseCase implements ISideMenuUseCase {
  constructor(
    @inject(symbols.sideMenuOperators)
    private sideMenuOperators: ISideMenuOperators,
  ) {}
  public handleClose = () => this.sideMenuOperators.handleClose({});
  public handleOpen = () => this.sideMenuOperators.handleOpen({});
}
