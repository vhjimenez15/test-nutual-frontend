## Implementación

> [!NOTE]
> Tenga en cuenta que debe realizar la instalación del backend antes de realizar la del frontend.

Se creó una aplicación backend construida en React (framework para javaScript) y con Material-ui (para componentes). Esta cuenta con dos páginas principales, el login y el home. Este segundo, a su vez tiene dis componentes; el primero para ver todos los datos que están guardados en el backend y el segundo para poder observar el valor medio de metros cuadrados (área total) de las viviendas de una ciudad determinada.

> [!WARNING]
> En necesario tener un usuario ya creado desde los comando del implementación del backend.

# Pasos para correr la aplicacion en local (Frontend)

Descargue el archivo o clone el repositorio en la respectiva máquina de prueba ("agregar repositorio").

Si tiene git y desea clonarlo del repositorio ejecute:
```
git clone "agregar repositorio"
```
Entre a la carpeta test-nutual-frontend, abra una terminal de su preferencia y ejecute:
```
docker-compose up --build
```

Cuando la el contenedor de docker haya lanzado de manera exitosa a la aplicación del fronted se habilitará el puerto 5173 del localhost para poder hacer uso de la misma.
Por lo que puede escribir el navegador lo siguiente:
```
http://localhost:5173/
```

Ya puede loguearse y ver los requerimientos de la prueba técnica.
