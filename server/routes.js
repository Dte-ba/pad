/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import open from 'open';

export default function(app) {
  // Insert routes below
  app.use('/api/design', require('./api/design'));

  var mode = 'server';
  if (process.env.PAD_MODE) {
    mode = process.env.PAD_MODE;
  }

  // make open for desktop apps
  if (mode==='desktop'){
    app
    .route('/open')
    .post((req, res) => {
      let p = req.query.path;
      open(p);
      res.json({});
    });
  }

  // add application information
  app
    .route('/api/info')
    .get(function(req, res){
      res.json({ 
        version: app.version, 
        kernel: app.kernel, 
        mode: mode,
        repository: process.env.REPOSITORY_PATH
     });
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
