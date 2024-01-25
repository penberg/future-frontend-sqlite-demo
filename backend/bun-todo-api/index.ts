import { build } from '@stricjs/app';
import { status } from '@stricjs/app/send';

const app = await build({
  autoprefix: true,
  routes: ['./routes'],
  serve: {
    reusePort: true,
    error: (err) => {
      console.error(err);
      return status(err.message, 500);
    }
  }
});

app.logRoutes();

export default app.boot();