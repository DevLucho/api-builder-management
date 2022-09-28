# Aviantur-BackEnd

## Instalación
```
> git clone https://github.com/DevLucho/api-builder-management.git
> cd api-builder-management
> npm install
```

## Configuración DB
- MongoDB
- Configurar DB en el archivo .env (nombreDB, puerto, host) 
- Importar datos de ejemplo de la carpeta: sample/
- Correr servidor

## Servidor Api
```
> npm run dev

```
- http://localhost:8080/

```
- http://localhost:8080/api/orders/create (crea solicitud)
- http://localhost:8080/api/orders/consult/date-end-project (consulta fecha de entraga del proyecto)
- http://localhost:8080/api/orders/export/pendiente (genera informe segun parametro por tipo de construccion)

- Es necesario configurar un crob job para ejecutar los siguientes enpoint que actualizan los estados de las solicitudes en la mañana y la noche:
- http://localhost:8080/api/orders/command/update-status-end
- http://localhost:8080/api/orders/command/update-status-pending

