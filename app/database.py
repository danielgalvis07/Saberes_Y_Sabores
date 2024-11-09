import mysql.connector

class Database:
    def __init__(self):
        self.connection = None

    def connect(self):
        if self.connection is None:
            self.connection = mysql.connector.connect(
                user='root',
                password='',
                host='localhost',
                database='semillas',
                port='3306'
            )
        return self.connection

    def close(self):
        if self.connection is not None:
            self.connection.close()
            self.connection = None
