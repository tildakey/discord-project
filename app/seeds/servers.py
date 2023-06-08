from app.models import db, Server, User, ServerMember, SCHEMA, environment
from sqlalchemy.sql import func, text
from sqlalchemy.sql.expression import func


def seed_servers():
    server1 = Server(
        name = 'Video Games',
        server_icon = 'TEST.jpg',
        description = 'Server about Video Games',
        owner_id = 1
    )
    server2 = Server(
        name = 'Movies',
        server_icon = 'TEST.jpg',
        description = 'Server about Movies',
        owner_id = 2
    )
    server3 = Server(
        name = 'General Server',
        server_icon = 'TEST.jpg',
        description = 'Server about Generals',
        owner_id = 3
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.commit()

def seed_server_members():
    for i in range(1 ,3):
        for j in range(1, 6):
            members = ServerMember(
                user_id = j,
                server_id = i
            )
            db.session.add(members)
            db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()


def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servermembers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servermembers"))

    db.session.commit()
