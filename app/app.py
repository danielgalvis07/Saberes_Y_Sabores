from flask import Flask, request, jsonify
from database import Database
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para toda la aplicación

db = Database()

def get_db_connection():
    """Establece una nueva conexión a la base de datos y la devuelve."""
    return db.connect()

@app.route('/registro_usuario', methods=['POST'])
def registro_usuario():
    print("accediendo a registro ruta")
    try:
        nombre = request.json.get('nombre')
        apellido = request.json.get('apellido')
        Email = request.json.get('email')
        Password = request.json.get('password')
        Rol = request.json.get('rol')
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = "INSERT INTO usuarios (nombre, apellido, Email, Password, Rol) VALUES (%s, %s, %s, %s, %s)"
        valores = (nombre, apellido, Email, Password, Rol)
        cursor.execute(sql, valores)
        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"message": "Usuario registrado con éxito"}), 200
    except Exception as err:
        return jsonify({"message":f"No funciono el registro {err}"}), 400

@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    sql = "SELECT IdUsuario, nombre, apellido, Email, Password, Rol FROM usuarios"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    cursor.close()
    conexion.close()
    
    usuarios = [
        {
            "id": row[0],
            "nombre": row[1],
            "apellidos": row[2],
            "correo": row[3].decode('utf-8') if isinstance(row[3], bytes) else row[3],
            "clave": row[4].decode('utf-8') if isinstance(row[4], bytes) else row[4],
            "rol": row[5],
            "activo": True
        }
        for row in resultado
    ]
    
    return jsonify(usuarios), 200

@app.route('/recetas', methods=['GET'])
def obtener_recetas():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    sql = "SELECT IdReceta, Nombre, Descripcion FROM recetas"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    cursor.close()
    conexion.close()
    
    recetas = [
        {
            "id": row[0],
            "Nombre": row[1],
            "Descripcion": row[2],
            "activo": True
        }
        for row in resultado
    ]
    
    return jsonify(recetas), 200

@app.route('/validar_usuario', methods=['POST'])
def validar_usuario():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    conexion = get_db_connection()
    cursor = conexion.cursor()

    sql = "SELECT * FROM usuarios WHERE Email = %s AND Password = %s"
    valores = (email, password)
    cursor.execute(sql, valores)
    resultado = cursor.fetchone()
    cursor.close()
    conexion.close()

    if resultado:
     
        rol = resultado[5]  #se pone en la columna en la que esta en la base de datos
        
        return jsonify({
            "message": "Usuario Iniciado",
            "rol": rol
        }), 200
    else:
        return jsonify({"message": "Error de autenticación"}), 401


@app.route('/actualizar_usuario', methods=['POST'])
def actualizar_usuarios():
    data = request.get_json()
    id_usuario = data.get("id")
    nombre = data.get("nombre")
    apellidos = data.get("apellidos")
    correo = data.get("correo")
    clave = data.get("clave")
    rol = data.get("rol")
    conexion = get_db_connection()
    cursor = conexion.cursor()
    sql = "UPDATE usuarios SET nombre=%s, apellido=%s, Email=%s, Password=%s, Rol=%s WHERE IdUsuario = %s"
    cursor.execute(sql, (nombre, apellidos, correo, clave, rol, id_usuario))
    conexion.commit()
    cursor.execute("SELECT IdUsuario, nombre, apellido, Email, Password, Rol FROM usuarios")
    resultado = cursor.fetchall()
    cursor.close()
    conexion.close()

    usuarios = [
        {
            "id": row[0],
            "nombre": row[1],
            "apellidos": row[2],
            "correo": row[3].decode('utf-8') if isinstance(row[3], bytes) else row[3],
            "clave": row[4].decode('utf-8') if isinstance(row[4], bytes) else row[4],
            "rol": row[5]
        }
        for row in resultado
    ]

    return jsonify(usuarios), 200

@app.route('/actualizar_receta', methods=['POST'])
def actualizar_recetas():
    data = request.get_json()
    id_receta = data.get("id")
    Nombre = data.get("Nombre")
    Descripcion = data.get("Descripcion")
    conexion = get_db_connection()
    cursor = conexion.cursor()
    sql = "UPDATE recetas SET Nombre=%s, Descripcion=%s WHERE IdReceta = %s"
    cursor.execute(sql, (Nombre, Descripcion, id_receta))
    conexion.commit()
    cursor.execute("SELECT IdReceta, Nombre, Descripcion FROM recetas")
    resultado = cursor.fetchall()
    cursor.close()
    conexion.close()

    recetas = [
        {
            "id": row[0],
            "Nombre": row[1],
            "Descripcion": row[2],
            "activo": True
        }
        for row in resultado
    ]

    return jsonify(recetas), 200

# vendedor

@app.route('/semillas', methods=['GET'])#MOSTRAR PRODUCTOS
def obtener_semilla():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    sql = "SELECT IdSemilla, NombreCientSemilla, imagen FROM semillas"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    cursor.close()
    conexion.close()
    
    semillas = [
        {
            "id": row[0],
            "nombre": row[1],
            "imagen": row[2]
        }
        for row in resultado
    ]
    
    return jsonify(semillas),200

#actualizar productos desde vendedor
@app.route('/actualizar_producto', methods=['POST'])
def actualizar_prosuctos():
    data = request.get_json()
    id_receta = data.get("id")
    nombre = data.get("nombre")
    imagen = data.get("imagen")
    conexion = get_db_connection()
    cursor = conexion.cursor()
    sql = "UPDATE semillas SET NombreCientSemilla=%s, imagen=%s WHERE IdSemilla = %s"
    cursor.execute(sql, (nombre, imagen, id_receta))
    conexion.commit()
    cursor.execute("SELECT IdSemilla, NombreCientSemilla, imagen FROM semillas")
    resultado = cursor.fetchall()
    cursor.close()
    conexion.close()

    semillas = [
        {
            "id": row[0],
            "nombre": row[1],
            "imagen": row[2]
        }
        for row in resultado
    ]

    return jsonify(semillas), 200

#registro de productos desde vendedor
@app.route('/registro_productos', methods=['POST'])
def registro_producto():
    print("accediendo a registro ruta")
    try:
        nombre = request.json.get('nombre')
        imagen = request.json.get('imagen')
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = "INSERT INTO semillas (NombreCientSemilla, imagen) VALUES (%s, %s)"
        valores = (nombre, imagen)
        cursor.execute(sql, valores)
        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"message": "producto registrado con éxito"}), 200
    except Exception as err:
        return jsonify({"message":f"No funciono el registro {err}"}), 400



if __name__ == '__main__':
    app.run(debug=True)
