import { conf } from './common/config';
import { app } from './app';

app.listen(conf.PORT, () =>
  console.log(`App is running on http://localhost:${conf.PORT}`)
);
