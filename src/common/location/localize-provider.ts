import { Localizer, LocalizerEn } from './localizer';
import { Messages, MessagesEn } from './messages';
import { Resources, ResourcesEn } from './resources';

const locales = {
  ja: {
    localizer: new Localizer(),
    messages: new Messages(),
    resources: new Resources(),
  },
  en: {
    localizer: new LocalizerEn(),
    messages: new MessagesEn(),
    resources: new ResourcesEn(),
  },
};
type Locales = typeof locales;
export type Culture = keyof Locales;

export const getCultureInfo = <TCulture extends Culture>(
  name: TCulture,
): Locales[TCulture] => {
  return locales[name];
};
