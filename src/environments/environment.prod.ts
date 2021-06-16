//export const pathPrincipal = "http://localhost:8080/api/";
export const nuevoBackHabilitado:boolean = true;
/**PATH DEVELOPMENT */
export const pathPrincipal = "https://dev-cabasto.sharktech.com.mx/api/";
export const pathChat = "https://dev-cabasto.sharktech.com.mx/";

/**PATH PRODUCTIVO */
/* export const pathPrincipal = "https://app.luegoluego.com.mx/api/";
export const pathChat = "https://app.luegoluego.com.mx/";
 */
//export const pathChat = "http://localhost:8080/";
//mod ubuntu
//DEV
//export const pathLuegoluegoNew = "http://192.168.8.2/luegoluego/luegoluego/";
//export const pathLuegoluegoNew = "http://localhost:8888/luegoluego/luegoluego/";
//PRO
//export const pathLuegoluegoNew = "http://custom.luegoluego.com.mx/luegoluego/luegoluego/";
//export const pathLuegoluegoNew = "http://custom.luegoluego.com.mx/luegoluego/luegoluego/";
export const pathLuegoluegoNew = "https://dev-custom.luegoluego.com.mx/luegoluego/luegoluego/"; 

export const appCliente = 1;
export const appProveedor = 2;
export const appTransportista = 3;

export const environment = {

  genericQuerie: `${pathLuegoluegoNew}generic-querie`,

  production: true,
  //proveedorProductos: `${pathPrincipal}proveedor-productos`,
  proveedorProductos: `${pathLuegoluegoNew}proveedor-productos`,
  //categoria: `${pathPrincipal}proveedor-productos/categoria/`,
  cotizaciones: `${pathLuegoluegoNew}cotizaciones`,
  //categoria: `${pathPrincipal}proveedor-productos/categoria/`,
  categoria: `${pathLuegoluegoNew}proveedor-productos/categoria/`,

  //secciones: `${pathPrincipal}seccions`,
  //categorias: `${pathPrincipal}categorias`,
  //proveedores: `${pathPrincipal}proveedors`,

  //proveedoresFull: `${pathPrincipal}proveedores`,
  proveedoresFull: `${pathLuegoluegoNew}proveedores`,

  //proveedor: `${pathPrincipal}proveedor`,
  proveedor: `${pathLuegoluegoNew}proveedor`,
  //transportista: `${pathPrincipal}transportista`,
  transportista: `${pathLuegoluegoNew}transportista`,

  registro: `${pathLuegoluegoNew}register`,
  //registro: `${pathPrincipal}register`,
  login: `${pathLuegoluegoNew}authenticate`,
  //login: `${pathPrincipal}authenticate`,
  
  //carritoCompras: `${pathPrincipal}carrito-compras`,
  carritoCompras: `${pathLuegoluegoNew}carrito-compras`,

  //carritoHistorico: `${pathPrincipal}carrito-historicos`,
  carritoHistorico: `${pathLuegoluegoNew}carrito-historicos`,

  //carritoHistoricoDetalle: `${pathPrincipal}carrito-historico-detalles`,
  carritoHistoricoDetalle: `${pathLuegoluegoNew}carrito-historico-detalles`,
  //getImagenIndividual: `${pathPrincipal}adjuntos/download/`,
  getImagenIndividual: `${pathLuegoluegoNew}adjuntos/download/`,
  promociones: `${pathLuegoluegoNew}promociones`,
  //tarjetas: `${pathPrincipal}tarjetas`,
  tarjetas: `${pathLuegoluegoNew}tarjetas`,
  //direcciones: `${pathPrincipal}usuario-direcciones`,
  direcciones: `${pathLuegoluegoNew}usuario-direcciones`,
  //tipoDirecciones: `${pathPrincipal}tipo-direcciones`,
  tipoDirecciones: `${pathLuegoluegoNew}tipo-direcciones`,
  
  //pedidos: `${pathPrincipal}pedidos`,
  pedidos: `${pathLuegoluegoNew}pedidos`,

  //pedidosProveedor: `${pathPrincipal}proveedor/pedidos`,
  pedidosProveedor: `${pathLuegoluegoNew}proveedor/pedidos`,

  //pedidosTransportista: `${pathPrincipal}transportista/pedidos`,
  pedidosTransportista: `${pathLuegoluegoNew}transportista/pedidos`,

  pedidosProveedores: `${pathLuegoluegoNew}proveedor/pedido-proveedores`,

  //pedidosTransportistas: `${pathPrincipal}transportista/pedido-proveedores`,
  pedidosTransportistas: `${pathLuegoluegoNew}transportista/pedido-proveedores`,

  //calificacionServicio: `${pathPrincipal}pedido-proveedores/calificacion-servicio`,
  calificacionServicio: `${pathLuegoluegoNew}pedido-proveedores/calificacion-servicio`,

  //usuarios: `${pathPrincipal}usuarios`,
  usuarios: `${pathLuegoluegoNew}usuarios`,

  //llegada: `${pathPrincipal}transportista/pedido-proveedores/notificacion-llegada`,
  llegada: `${pathLuegoluegoNew}transportista/pedido-proveedores/notificacion-llegada`,
  //queja: `${pathPrincipal}quejas`,
  queja: `${pathLuegoluegoNew}quejas`,

  //usuarioDocumentos: `${pathPrincipal}usuario-documentos`,
  usuarioDocumentos: `${pathLuegoluegoNew}usuario-documentos`,

  //users: `${pathPrincipal}users`,
  users: `${pathLuegoluegoNew}users`,

  //chats: `${pathPrincipal}chats`,
  chats: `${pathLuegoluegoNew}chats`,

  //chatsProveedor: `${pathPrincipal}proveedor/chats/pedido-proveedor/`,
  chatsProveedor: `${pathLuegoluegoNew}proveedor/chats/pedido-proveedor/`,

  cambioContraseña: `${pathPrincipal}account/change-password`,


  //carritoComprasProveedor: `${pathPrincipal}carrito-compras-proveedor`,
  carritoComprasProveedor: `${pathLuegoluegoNew}carrito-compras-proveedor`,

  //carritoHistoricosProveedor: `${pathPrincipal}carrito-historicos-proveedores`,
  carritoHistoricosProveedor: `${pathLuegoluegoNew}carrito-historicos-proveedores`,

  reset: `${pathPrincipal}account/reset-password/init`,

  logout: null,
  icons: {
    persona: {
      icon: "assets/imgs/direcciones/m3.png"
    },
    casa: {
      icon: "assets/imgs/direcciones/m2.png"
    },
    lugar: {
      icon: "assets/imgs/direcciones/m1.png"
    },
    proveedor: {
      icon: "assets/imgs/direcciones/m4.png"
    }
  },

  //info de GOOGLE
  geocodeGoogle: "https://maps.googleapis.com/maps/api/geocode/json",
  keyGoogle: "AIzaSyBTzFU__xJrf9DvyWrVToCVfRWoIUIEmx0",

  //Fines de pruebas
  emulado: true,//true,

  //Aqui "cambiamos" la app en ejecución
  perfil:{
    activo: appCliente,
    //activo: appProveedor
    //activo: appTransportista
  },

  st:{
    keyPublic: 'U2FsdGVkX19CQc0Np+So9tyR3R9dAm7lOeyk2UQ+FoHcjsmxFAcZES1Hix101zBa1gljuF7xoHmJQVXb6oP6Mg=='
    //keyPublic: 'U2FsdGVkX1/ADpxluaklCuGOBDdLHN6q44K8U8mHKBbCF95IBvllQPUxmSiAyj9hqImPuFlYzLS2MUFJU9ZOdg==',
  }
};
