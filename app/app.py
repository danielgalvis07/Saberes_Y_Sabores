from flask import Flask, request, jsonify
from database import Database
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from sql import Sql

app = Flask(__name__)
app.secret_key = "MrPotato"
CORS(app)  # Habilita CORS para toda la aplicación
app.config["JWT_SK"] = "super-secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
jwt = JWTManager(app)

db = Database()

def get_db_connection():
    """Establece una nueva conexión a la base de datos y la devuelve."""
    return db.connect()


#----------------------------------------------------USUARIOS------------------------------------------------------
@app.route('/registro_usuario', methods=['POST'])#REGISTAR
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

@app.route('/usuarios', methods=['GET'])#MOSTRAR USUARIOS
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

@app.route('/login', methods=['POST'])# VALIDAR USUARIOS
def login():
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
        access_token = create_access_token(identity=resultado[0])
        print(access_token)
        
        id = resultado[0]
        nombre = resultado[1]
        apellido = resultado[2]
        email = resultado[3]
        psw = resultado[4]
        rol = resultado[5]

        user = {
            "id": id,
            'nombre':nombre,
            'apellido': apellido,
            'email': email,
            'password': psw,
            'rol': rol,
            'token':access_token,
        }
        token=user["token"]

        return jsonify({
            "message": "Usuario Iniciado",
            "rol": rol,
            "token": token
        }), 200
    else:
        return jsonify({"message": "Error de autenticación"}), 401
    
    

# @app.route('/validate_token', methods=['POST'])# VALIDAR USUARIOS
# def validate_token():
    
    
    
@app.route('/actualizar_usuario', methods=['POST'])#ACTUALIZAR USUARIOS
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
#-------------------------------------------------------------RECETAS-----------------------

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

@app.route('/actualizar_receta', methods=['POST'])#----------------------ACTUALIZAR RECETA
def actualizar_recetas():
    data = request.get_json()
    print(data)
    id_receta = data.get("id")
    Nombre = data.get("Nombre")
    Descripcion = data.get("Descripcion")
    resultado = Sql.update_receta( Nombre, Descripcion,id_receta)
    
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



@app.route('/registro_recetas', methods=['POST'])#registro de productos admin
def registro_receta(): 
    try:
        data = request.get_json()
        nombre = data['nombre']
        descripcion = data['descripcion']
        imagen = data['imagen']
    
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = "INSERT INTO recetas (Nombre, Descripcion, Imagen) VALUES (%s, %s, %s)"
        valores = (nombre, descripcion, imagen)
        cursor.execute(sql, valores)
        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"message": "receta registrado con éxito"}), 200
    except Exception as err:
        return jsonify({"message":f"No funciono el registro {err}"}), 400
    




# ---------------------------------------------------------------------------------VENDEDOR

@app.route('/semillas', methods=['GET'])#MOSTRAR PRODUCTOS
# @jwt_required()
def obtener_semilla():

    # 
    
    resultado = Sql.select_semillas()
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
def actualizar_productos():
    data = request.get_json()
    id_receta = data.get("id")
    nombre = data.get("nombre")
    imagen = data.get("imagen")

    resultado = Sql.update_semillas(nombre, imagen, id_receta)
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
    try:
        nombre = request.json.get('nombre')
        imagen = request.json.get('imagen')
        Sql.insert_semillas(nombre, imagen)

        return jsonify({"message": "producto registrado con éxito"}), 200
    except Exception as err:
        return jsonify({"message":f"No funciono el registro {err}"}), 400

if __name__ == '__main__':
    app.run(debug=True)
