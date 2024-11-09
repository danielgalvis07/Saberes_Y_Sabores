from flask import Flask, request, jsonify
from database import Database
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para toda la aplicación


db = Database()

@app.route('/registro_usuario', methods=['POST'])
def registro_usuario():
    print("accediendo a registro ruta")
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        Rol = ('0')
        conexion = db.connect()
        cursor = conexion.cursor()
        print(email)
        print(password)
        sql = "INSERT INTO usuarios (Email, Password, Rol) VALUES (%s, %s, %s)"
        valores = (email, password, Rol)

        cursor.execute(sql, valores)
        conexion.commit()
        cursor.close()

        return jsonify({"message": "Usuario registrado con éxito"}), 200
    except Exception as err:
        return jsonify({"message":f"No funciono el registro {err}"}), 400

@app.route('/validar_usuario', methods=['POST'])
def validar_usuario():
    data = request.get_json()  # Obtener los datos JSON del frontend
    email = data.get('email')
    password = data.get('password')
    print(email,password)

    # Conectar a la base de datos y verificar si el usuario existe
    conexion = db.connect()
    cursor = conexion.cursor()

    sql = "SELECT * FROM usuarios WHERE Email = %s AND Password = %s"
    valores = (email, password)

    cursor.execute(sql, valores)
    resultado = cursor.fetchone()

    cursor.close()
    db.close()

    if resultado:
        return jsonify({"message": "Usuario Iniciado"}), 200  # Si la autenticación es correcta
    else:
        return jsonify({"message": "Error de autenticación"}), 401  # Si falla la autenticación
    
@app.route('/usuariosAdmin')
def index():
    conexion = db.connect()
    cur = conexion.cursor()
    cur.execute('SELECT * FROM usuarios')
    data = cur.fetchall()
    print(data)
    return jsonify( contacts=data)    


if __name__ == '__main__':
    app.run(debug=True)
