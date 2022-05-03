import sqlite3


def query_to_dict(titles, rows):
    res = []
    for row in rows:
        d = {}
        for item in range(len(row)):
            d[titles[item][0]] = row[item]
        res.append(d)
    return res


def execute_query(query, *args):
    conn = sqlite3.connect('db/server.db')
    cur = conn.cursor()
    cur.execute(query, args)
    rows = cur.fetchall()
    titles = cur.description
    res = query_to_dict(titles, rows)
    conn.commit()
    conn.close()
    return res
