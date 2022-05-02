import sqlite3


def execute_query(query, *args):
    conn = sqlite3.connect('db/server.db')
    conn.execute(query, args)
    conn.commit()
    conn.close()
