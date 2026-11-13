# Mi web de prueba — Pymes Control

Página estática de demostración, separada de las webs existentes. No contiene datos de clientes, cuentas, formularios ni credenciales.

## Publicación

GitHub Pages: rama `main`, carpeta `/docs`. La página carga el título desde `./control-de-web.json` y permite volver a consultarlo con el botón «Actualizar contenido».

## Contenido compatible con el piloto

- Campo: `home.webModernTitle`, texto plano de 1 a 80 caracteres.
- Archivos: `public/control-de-web.json` y `docs/control-de-web.json`.
- Ambos archivos deben contener los mismos datos y modificarse en un único commit.
- Título inicial: **Una web sencilla para grandes ideas.**

La GitHub App solo puede acceder al repositorio después de que su propietario lo autorice. El servicio Pymes Control debe verificar y vincular además esa instalación con la identidad del cliente. Compartir este enlace no concede acceso ni transfiere la propiedad.

Cada cambio del piloto requiere vista previa y confirmación. Después de guardarlo en GitHub hay que esperar al despliegue de Pages y comprobar el texto visible. No se debe afirmar que la publicación del piloto está activada solamente porque exista esta web.

El HTML contiene un texto inicial de respaldo. Si falla la lectura del JSON, la página conserva el último título visible y muestra un aviso; el JSON es la fuente del título editable.
