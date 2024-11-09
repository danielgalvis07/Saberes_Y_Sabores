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


@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    conexion = db.connect()
    cursor = conexion.cursor()
    sql = "SELECT IdUsuario, nombre, apellido, Email, Password, Rol FROM usuarios"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    cursor.close()
    db.close()
    
    usuarios = []
    for row in resultado:
        usuario = {
            "id": row[0],
            "nombre": row[1],
            "apellidos": row[2],
            "correo": row[3].decode('utf-8') if isinstance(row[3], bytes) else row[3],
            "clave": row[4].decode('utf-8') if isinstance(row[4], bytes) else row[4],
            "rol": row[5],
            "activo": True  # Suponiendo que todos los usuarios están activos por defecto
        }
        usuarios.append(usuario)
    
    return jsonify(usuarios), 200
@app.route('/recetas', methods=['GET'])
def obtener_recetas():
    conexion = db.connect()
    cursor = conexion.cursor()
    sql = "SELECT IdReceta, Nombre, Descripcion FROM recetas"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    cursor.close()
    db.close()
    
    recetas = []
    for row in resultado:
        receta = {
            "id": row[0],
            "Nombre": row[1],
            "Descripcion": row[2],
            "activo": True  # Suponiendo que todos los recetas están activos por defecto
        }
        recetas.append(receta)
    
    return jsonify(recetas), 200

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
       
@app.route('/actualizar_usuario', methods=['POST'])
def actualizar_usuarios():
    data = request.get_json()

    id_usuario = data.get("id")
    nombre = data.get("nombre")
    apellidos = data.get("apellidos")
    correo = data.get("correo")
    clave = data.get("clave")
    rol = data.get("rol")

    conexion = db.connect()
    cursor = conexion.cursor()

    # Actualizar el usuario en la base de datos
    sql = "UPDATE usuarios SET nombre=%s, apellido=%s, Email=%s, Password=%s, Rol=%s WHERE IdUsuario = %s"
    cursor.execute(sql, (nombre, apellidos, correo, clave, rol, id_usuario))
    conexion.commit()

    # Consultar los usuarios actualizados para devolver la lista completa
    cursor.execute("SELECT IdUsuario, nombre, apellido, Email, Password, Rol FROM usuarios")
    resultado = cursor.fetchall()
    cursor.close()
    conexion.close()

    # Construir la respuesta JSON con la lista de usuarios
    usuarios = []
    for row in resultado:
        usuario = {
            "id": row[0],
            "nombre": row[1],
            "apellidos": row[2],
            "correo": row[3].decode('utf-8') if isinstance(row[3], bytes) else row[3],
            "clave": row[4].decode('utf-8') if isinstance(row[4], bytes) else row[4],
            "rol": row[5]
        }
        usuarios.append(usuario)

    return jsonify(usuarios), 200

@app.route('/actualizar_receta', methods=['POST'])
def actualizar_recetas():
    data = request.get_json()

    id_receta = data.get("id")
    Nombre = data.get("Nombre")
    Descripcion = data.get("Descripcion")


    conexion = db.connect()
    cursor = conexion.cursor()

    # Actualizar el usuario en la base de datos
    sql = "UPDATE recetas SET Nombre=%s, Descripcion=%s WHERE IdReceta = %s"
    cursor.execute(sql, (Nombre, Descripcion, id_receta))
    conexion.commit()

    # Consultar los usuarios actualizados para devolver la lista completa
    cursor.execute("SELECT IdReceta, Nombre, Descripcion FROM recetas")
    resultado = cursor.fetchall()
    cursor.close()
    conexion.close()

    # Construir la respuesta JSON con la lista de usuarios

    recetas = []
    for row in resultado:
        receta = {
            "id": row[0],
            "Nombre": row[1],
            "Descripcion": row[2],
            "activo": True  # Suponiendo que todos los recetas están activos por defecto
        }
        recetas.append(receta)

    return jsonify(recetas), 200


if __name__ == '__main__':
    app.run(debug=True)
