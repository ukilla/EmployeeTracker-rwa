import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';

import { AppModule } from './app/app.module';

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhBYVF+WmFZfV1gfF9GZVZRQmYuP1ZhSXxQdk1hWH9WcHFVQGBYVEY='
);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
