import { Container } from 'src/infrastructures/services/inversify-helper';
import { useCaseSymbols } from './use-case-symbols';
import { WorkspaceUseCase } from '../workspace-use-case';
import { MessagesUseCase } from '../messages-use-case';
import { AccountsUseCase } from '../accounts-use-case';

export const registerUseCases = (container: Container) => {
  container.register(useCaseSymbols.workspaceUseCase, binder =>
    binder.to(WorkspaceUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.accountsUseCase, binder =>
    binder.to(AccountsUseCase).inSingletonScope(),
  );
  container.register(useCaseSymbols.messagesUseCase, binder =>
    binder.to(MessagesUseCase).inSingletonScope(),
  );
};
