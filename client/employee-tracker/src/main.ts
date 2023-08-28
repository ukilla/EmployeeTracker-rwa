import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';

import { AppModule } from './app/app.module';

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhAYVFxWmFZfV1gdl9CZFZRRmY/P1ZhSXxQdk1hUX5adHBVRWRaVkc='
);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
