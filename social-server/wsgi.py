import logging

from werkzeug.middleware.proxy_fix import ProxyFix
from server import create_app
from config import DOMAIN


gunicorn_logger = logging.getLogger('gunicorn.error')

app = create_app(logger_override=gunicorn_logger)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_host=1)

if __name__ == "__main__":
    app.run(debug=False, host=f'{DOMAIN}')
