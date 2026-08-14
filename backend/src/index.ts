import app from "./app";

const server = app.listen(app.get("port"), () => {
	console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
});
