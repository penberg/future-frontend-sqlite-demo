import { build } from '@stricjs/app';
import { status } from '@stricjs/app/send';

const app = await build({
  autoprefix: true,
  routes: ['./routes'],
  serve: {
    reusePort: true,
    error: (err) => {
      console.error(err);
      const response = status(err.message, 500);
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  }
});

app.logRoutes();

export default app.boot();