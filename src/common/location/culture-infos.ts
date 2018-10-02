import { Localizer, LocalizerEn } from './localizer';
import { Messages, MessagesEn } from './messages';
import { Resources, ResourcesEn } from './resources';

export const cultureInfos = {
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
type CultureInfos = typeof cultureInfos;
export type Culture = keyof CultureInfos;
