# social-game
## RUNNING THE SERVER
Run with 4 worker @localhost:5000

You can run the backend server via scripts

```bash
./scripts/runserver.sh
```
or

```bash
gunicorn --workers 4 --bind 0.0.0.0:5000 wsgi:app
```