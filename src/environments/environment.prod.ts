//export const pathPrincipal = "http://localhost:8080/api/";
//export const pathPrincipal = "https://dev-cabasto.sharktech.com.mx/api/";
//export const pathChat = "https://dev-cabasto.sharktech.com.mx/";

/**PATH PRODUCTIVO */
export const pathPrincipal = "https://app.luegoluego.com.mx/api/";
export const pathChat = "https://app.luegoluego.com.mx/";

//export const pathChat = "http://localhost:8080/";

export const appCliente = 1;
export const appProveedor = 2;
export const appTransportista = 3;

export const environment = {
  production: true,
  productos: `${pathPrincipal}productos`,
  productosCategoria: `${pathPrincipal}productos/home`,
  proveedorProductos: `${pathPrincipal}proveedor-productos`,
  categoria: `${pathPrincipal}proveedor-productos/categoria/`,
  secciones: `${pathPrincipal}seccions`,
  categorias: `${pathPrincipal}categorias`,
  proveedores: `${pathPrincipal}proveedors`,

  proveedoresFull: `${pathPrincipal}proveedores`,
  proveedor: `${pathPrincipal}proveedor`,
  transportista: `${pathPrincipal}transportista`,
  proveedoresProducto: `${pathPrincipal}proveedores/producto/`,

  registro: `${pathPrincipal}register`,
  login: `${pathPrincipal}authenticate`,
  carritoCompras: `${pathPrincipal}carrito-compras`,
  carritoHistorico: `${pathPrincipal}carrito-historicos`,
  carritoHistoricoDetalle: `${pathPrincipal}carrito-historico-detalles`,
  getImagenIndividual: `${pathPrincipal}adjuntos/download/`,
  promociones: `${pathPrincipal}promociones`,
  tarjetas: `${pathPrincipal}tarjetas`,
  direcciones: `${pathPrincipal}usuario-direcciones`,
  tipoDirecciones: `${pathPrincipal}tipo-direcciones`,
  pedidos: `${pathPrincipal}pedidos`,
  pedidosProveedor: `${pathPrincipal}proveedor/pedidos`,
  pedidosTransportista: `${pathPrincipal}transportista/pedidos`,

  pedidosProveedores: `${pathPrincipal}proveedor/pedido-proveedores`,
  pedidosTransportistas: `${pathPrincipal}transportista/pedido-proveedores`,

  calificacionServicio: `${pathPrincipal}pedido-proveedores/calificacion-servicio`,

  usuarios: `${pathPrincipal}usuarios`,

  llegada: `${pathPrincipal}transportista/pedido-proveedores/notificacion-llegada`,
  queja: `${pathPrincipal}quejas`,

  usuarioDocumentos: `${pathPrincipal}usuario-documentos`,

  users: `${pathPrincipal}users`,

  chats: `${pathPrincipal}chats`,

  chatsProveedor: `${pathPrincipal}proveedor/chats/pedido-proveedor/`,

  cambioContraseña: `${pathPrincipal}account/change-password`,


  carritoComprasProveedor: `${pathPrincipal}carrito-compras-proveedor`,

  carritoHistoricosProveedor: `${pathPrincipal}carrito-historicos-proveedores`,

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
  keyGoogle: "AIzaSyDpg-WwghYJCwSq1Q8nM_5ZW5IY5tLNFmQ",

  //Fines de pruebas
  emulado: false,//true,

  //Aqui "cambiamos" la app en ejecución
  perfil:{
    activo: appCliente,
    //activo: appProveedor
    //activo: appTransportista
  },

  st:{
    //keyPublic: 'U2FsdGVkX19CQc0Np+So9tyR3R9dAm7lOeyk2UQ+FoHcjsmxFAcZES1Hix101zBa1gljuF7xoHmJQVXb6oP6Mg=='
    keyPublic: 'U2FsdGVkX1/ADpxluaklCuGOBDdLHN6q44K8U8mHKBbCF95IBvllQPUxmSiAyj9hqImPuFlYzLS2MUFJU9ZOdg==',
  }
};
