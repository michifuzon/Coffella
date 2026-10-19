/**
 * Contenido de ejemplo para los prototipos de la home.
 * Todas las personas, cafeterías y eventos son ficticios.
 * Estructura pensada para reemplazarse por datos de API/CMS.
 */

export type Atributo =
  | "ruido-bajo"
  | "enchufes"
  | "wifi"
  | "luz-natural"
  | "para-trabajar"
  | "para-conversar"
  | "sin-tacc"
  | "leche-vegetal"
  | "v60"
  | "aeropress"
  | "abierto";

export const ATRIBUTOS: { id: Atributo; label: string; grupo: "Espacio" | "Café" | "Dieta" | "Ahora" }[] = [
  { id: "abierto", label: "Abierto ahora", grupo: "Ahora" },
  { id: "ruido-bajo", label: "Ruido bajo", grupo: "Espacio" },
  { id: "enchufes", label: "Enchufes", grupo: "Espacio" },
  { id: "wifi", label: "Wi-Fi estable", grupo: "Espacio" },
  { id: "luz-natural", label: "Luz natural", grupo: "Espacio" },
  { id: "para-trabajar", label: "Ideal para trabajar", grupo: "Espacio" },
  { id: "para-conversar", label: "Ideal para conversar", grupo: "Espacio" },
  { id: "v60", label: "V60", grupo: "Café" },
  { id: "aeropress", label: "Aeropress", grupo: "Café" },
  { id: "sin-tacc", label: "Sin TACC", grupo: "Dieta" },
  { id: "leche-vegetal", label: "Leche vegetal", grupo: "Dieta" },
];

export type Cafeteria = {
  id: string;
  nombre: string;
  barrio: string;
  tipo: "Especialidad" | "Tradicional";
  x: number; // posición en el mapa ilustrado (0–100)
  y: number;
  atributos: Atributo[];
  ambiente: string;
  musica: string;
  baristaDeTurno: string;
  recomienda: string;
  granos: string;
  carta: { item: string; precio: number }[];
  actualizado: string;
};

export const CAFETERIAS: Cafeteria[] = [
  {
    id: "ambar",
    nombre: "Café Ámbar",
    barrio: "Güemes",
    tipo: "Especialidad",
    x: 38,
    y: 62,
    atributos: ["ruido-bajo", "enchufes", "wifi", "luz-natural", "para-trabajar", "v60", "leche-vegetal", "abierto"],
    ambiente: "Ventanal grande, mesas largas compartidas y mucha planta.",
    musica: "Jazz bajito a la mañana, algo más movido a la tarde.",
    baristaDeTurno: "Sofi",
    recomienda: "Si te gustan los cafés suaves, empezá por el filtrado de Huila.",
    granos: "Tostadores locales, rota cada dos semanas",
    carta: [
      { item: "Espresso", precio: 2800 },
      { item: "Flat white", precio: 4200 },
      { item: "Filtrado V60", precio: 4800 },
    ],
    actualizado: "hace 2 días",
  },
  {
    id: "nomada",
    nombre: "Nómada",
    barrio: "Nueva Córdoba",
    tipo: "Especialidad",
    x: 55,
    y: 70,
    atributos: ["wifi", "enchufes", "para-trabajar", "aeropress", "sin-tacc", "abierto"],
    ambiente: "Barra al frente, banquetas y un patio chiquito al fondo.",
    musica: "Indie y lo-fi. Nunca tan fuerte como para no escucharte.",
    baristaDeTurno: "Juli",
    recomienda: "El cortado acá es de otro planeta. Pedilo con leche de avena.",
    granos: "Blend de la casa + un origen invitado",
    carta: [
      { item: "Espresso", precio: 2500 },
      { item: "Cortado", precio: 2900 },
      { item: "Aeropress", precio: 4500 },
    ],
    actualizado: "ayer",
  },
  {
    id: "pausa",
    nombre: "La Pausa",
    barrio: "General Paz",
    tipo: "Tradicional",
    x: 74,
    y: 34,
    atributos: ["para-conversar", "luz-natural", "sin-tacc", "leche-vegetal"],
    ambiente: "Esquina de barrio, mesas de mármol y medialunas recién hechas.",
    musica: "Radio, folclore y alguna charla de la mesa de al lado.",
    baristaDeTurno: "Don Raúl",
    recomienda: "Café con leche en taza grande y dos medialunas. Clásico que no falla.",
    granos: "Tostado propio, perfil achocolatado",
    carta: [
      { item: "Café chico", precio: 2200 },
      { item: "Café con leche", precio: 3100 },
      { item: "Submarino", precio: 3600 },
    ],
    actualizado: "hace 5 días",
  },
  {
    id: "ritual",
    nombre: "Ritual Tostadores",
    barrio: "Alberdi",
    tipo: "Especialidad",
    x: 22,
    y: 38,
    atributos: ["ruido-bajo", "v60", "aeropress", "para-conversar", "abierto"],
    ambiente: "Tostadora a la vista. Huele a café recién tostado todo el día.",
    musica: "Casi nada: se escucha la máquina y las charlas.",
    baristaDeTurno: "Tomás",
    recomienda: "Preguntale por el lote de la semana. Te lo cuenta con mapa y todo.",
    granos: "Tuestan ahí mismo, venden en bolsa",
    carta: [
      { item: "Espresso", precio: 3000 },
      { item: "Filtrado del día", precio: 4600 },
      { item: "Bolsa 250 g", precio: 14500 },
    ],
    actualizado: "hoy",
  },
  {
    id: "terraza",
    nombre: "Terraza 9",
    barrio: "Cerro de las Rosas",
    tipo: "Especialidad",
    x: 30,
    y: 16,
    atributos: ["luz-natural", "para-conversar", "leche-vegetal", "wifi"],
    ambiente: "Terraza con sombra de árboles. Ideal para un café sin apuro.",
    musica: "Bossa y soul, volumen amable.",
    baristaDeTurno: "Caro",
    recomienda: "El cold brew con tónica en días de calor. Hacé caso.",
    granos: "Origen único de Brasil y Etiopía",
    carta: [
      { item: "Espresso", precio: 3200 },
      { item: "Cold brew tonic", precio: 5200 },
      { item: "Latte", precio: 4400 },
    ],
    actualizado: "hace 3 días",
  },
  {
    id: "centro",
    nombre: "Molienda Centro",
    barrio: "Centro",
    tipo: "Especialidad",
    x: 58,
    y: 46,
    atributos: ["enchufes", "wifi", "para-trabajar", "v60", "abierto"],
    ambiente: "Rápido, luminoso, con barra para laptop y gente yendo y viniendo.",
    musica: "Electrónica tranquila. Ritmo de oficina amable.",
    baristaDeTurno: "Mati",
    recomienda: "Si tenés diez minutos, el espresso tonic. Si tenés una hora, el V60.",
    granos: "Colombia y Perú, tostadores invitados",
    carta: [
      { item: "Espresso", precio: 2700 },
      { item: "Espresso tonic", precio: 4300 },
      { item: "Filtrado V60", precio: 4700 },
    ],
    actualizado: "hace 1 día",
  },
];

export type Nivel = "curiosos" | "fans" | "profes";

export const NIVELES: { id: Nivel; label: string; desc: string }[] = [
  { id: "curiosos", label: "Para curiosos", desc: "No hace falta saber nada. Solo ganas." },
  { id: "fans", label: "Para fans", desc: "Ya tenés tu café favorito y querés ir más allá." },
  { id: "profes", label: "Para profes", desc: "Calibración, técnica y oficio." },
];

export type Evento = {
  id: string;
  dia: number; // 0 = lunes
  hora: string;
  titulo: string;
  tipo: "Cata" | "Taller" | "Encuentro" | "Coffee rave" | "Barista invitado";
  nivel: Nivel;
  lugar: string;
  anfitrion: string;
  precio: number | null;
  cupos: number;
  descripcion: string;
};

export const EVENTOS: Evento[] = [
  {
    id: "e1",
    dia: 0,
    hora: "19:00",
    titulo: "Merienda guiada: ¿por qué este café sabe a frutas?",
    tipo: "Encuentro",
    nivel: "curiosos",
    lugar: "Café Ámbar · Güemes",
    anfitrion: "Sofi",
    precio: 6000,
    cupos: 8,
    descripcion: "Tres cafés, una merienda y ninguna palabra rara sin explicar.",
  },
  {
    id: "e2",
    dia: 1,
    hora: "18:30",
    titulo: "Latte art desde cero",
    tipo: "Taller",
    nivel: "fans",
    lugar: "Nómada · Nueva Córdoba",
    anfitrion: "Juli",
    precio: 15000,
    cupos: 4,
    descripcion: "Jarras, leche y paciencia. Te vas con tu primer corazón (o algo parecido).",
  },
  {
    id: "e3",
    dia: 3,
    hora: "10:00",
    titulo: "Calibración y cata a ciegas",
    tipo: "Cata",
    nivel: "profes",
    lugar: "Ritual Tostadores · Alberdi",
    anfitrion: "Tomás",
    precio: 12000,
    cupos: 6,
    descripcion: "Protocolo de cata, ajuste de molienda y debate sano entre colegas.",
  },
  {
    id: "e4",
    dia: 4,
    hora: "20:00",
    titulo: "Coffee rave en la terraza",
    tipo: "Coffee rave",
    nivel: "curiosos",
    lugar: "Terraza 9 · Cerro",
    anfitrion: "Caro",
    precio: null,
    cupos: 40,
    descripcion: "DJ, cold brew y gente nueva. Entrada libre, se recomienda reservar.",
  },
  {
    id: "e5",
    dia: 5,
    hora: "11:00",
    titulo: "Barista invitado: espresso de un solo origen",
    tipo: "Barista invitado",
    nivel: "fans",
    lugar: "Molienda Centro",
    anfitrion: "Mati",
    precio: 8000,
    cupos: 10,
    descripcion: "Un mismo café, cinco recetas. Vos elegís cuál te gusta más.",
  },
  {
    id: "e6",
    dia: 5,
    hora: "17:00",
    titulo: "Ronda de baristas: cómo armar tu perfil profesional",
    tipo: "Encuentro",
    nivel: "profes",
    lugar: "Café Ámbar · Güemes",
    anfitrion: "Comunidad Coffella",
    precio: null,
    cupos: 20,
    descripcion: "Charla abierta entre colegas sobre trayectoria, capacitaciones y referencias.",
  },
];

export type Persona = {
  id: string;
  nombre: string;
  /** cómo la llama la comunidad; vincula eventos y momentos */
  apodo: string;
  /** cafetería donde trabaja, solo si eligió mostrarla */
  cafeteria?: string;
  rol: string;
  barrio: string;
  anios: number;
  especialidades: string[];
  recomienda: string;
  recorrido: string[];
  cita: string;
  tono: "naranja" | "amarillo" | "cafe" | "crema";
};

export const PERSONAS: Persona[] = [
  {
    id: "sofi",
    apodo: "Sofi",
    cafeteria: "ambar",
    nombre: "Sofía R.",
    rol: "Barista de especialidad",
    barrio: "Güemes",
    anios: 4,
    especialidades: ["Espresso", "Filtrados", "Atención en barra"],
    recomienda: "Un filtrado de Huila, sin azúcar la primera vez. Después hablamos.",
    recorrido: ["Curso de barismo SCA", "Head barista en Café Ámbar", "Jurado en latte art local"],
    cita: "Me gusta que mi perfil no hable solamente del café en el que trabajo.",
    tono: "naranja",
  },
  {
    id: "tomas",
    apodo: "Tomás",
    cafeteria: "ritual",
    nombre: "Tomás E.",
    rol: "Tostador",
    barrio: "Alberdi",
    anios: 9,
    especialidades: ["Tueste", "Cata", "Perfiles de origen"],
    recomienda: "Probá el mismo grano en espresso y en V60. Son dos cafés distintos.",
    recorrido: ["Q Grader en formación", "Fundador de Ritual", "Visitas a fincas en Colombia"],
    cita: "Detrás de cada bolsa hay un montón de gente. Me gusta que se vea.",
    tono: "cafe",
  },
  {
    id: "juli",
    apodo: "Juli",
    cafeteria: "nomada",
    nombre: "Julieta M.",
    rol: "Head barista · Formadora",
    barrio: "Nueva Córdoba",
    anios: 6,
    especialidades: ["Latte art", "Capacitación", "Leches vegetales"],
    recomienda: "Cortado con avena. Si no te gusta, te invito otro.",
    recorrido: ["Formadora de equipos", "2º puesto en competencia regional", "Talleres para principiantes"],
    cita: "Enseñar es la mejor forma de seguir aprendiendo.",
    tono: "amarillo",
  },
  {
    id: "mati",
    apodo: "Mati",
    cafeteria: "centro",
    nombre: "Matías G.",
    rol: "Barista · Bar lead",
    barrio: "Centro",
    anios: 3,
    especialidades: ["Espresso", "Bebidas de autor", "Velocidad en barra"],
    recomienda: "Espresso tonic si hace calor. Y si no, también.",
    recorrido: ["Empezó lavando tazas", "Bar lead en Molienda", "Curso de tueste básico"],
    cita: "Un día pedís un latte. Al otro estás preguntando por la molienda.",
    tono: "crema",
  },
];

export const FRASES = [
  "Ese café no llegó solo hasta tu mesa.",
  "Un día pedís un latte. Al otro estás preguntando por la molienda.",
  "Si te alegró la mañana, decíselo.",
  "Hay mucho pasando antes del primer sorbo.",
  "El café se termina. El reconocimiento puede quedarse.",
  "¿Estuvo bueno? Que lo sepa quien lo hizo.",
];

export type TipoMomento = "recomendacion" | "gracias" | "oportunidad" | "aprendizaje";

export const TIPOS_MOMENTO: { id: TipoMomento; label: string }[] = [
  { id: "recomendacion", label: "Recomendaciones" },
  { id: "gracias", label: "Agradecimientos" },
  { id: "oportunidad", label: "Oportunidades" },
  { id: "aprendizaje", label: "Aprendizajes" },
];

export type Momento = {
  id: string;
  tipo: TipoMomento;
  de: string;
  rolDe: string;
  para?: string;
  texto: string;
  lugar?: string;
  hace: string;
};

export const MOMENTOS: Momento[] = [
  { id: "m1", tipo: "gracias", de: "Lu", rolDe: "Fan del café", para: "Sofi", texto: "Me recomendaste el Huila y ahora no tomo otra cosa. Gracias por la paciencia con mis preguntas.", lugar: "Café Ámbar", hace: "hace 2 h" },
  { id: "m2", tipo: "oportunidad", de: "Nómada", rolDe: "Cafetería", texto: "Buscamos barista para el turno mañana. Valoramos ganas de aprender más que años de experiencia.", lugar: "Nueva Córdoba", hace: "hace 5 h" },
  { id: "m3", tipo: "aprendizaje", de: "Tomás", rolDe: "Tostador", texto: "¿Por qué este café sabe a frutas si no tiene frutas? Spoiler: el origen y el tueste. Lo charlamos el jueves.", hace: "ayer" },
  { id: "m4", tipo: "recomendacion", de: "Caro", rolDe: "Barista", texto: "Si te gustan los cafés más suaves, empezá por un filtrado. Si te gusta lo intenso, espresso. Y si no sabés, preguntá.", hace: "ayer" },
  { id: "m5", tipo: "gracias", de: "Nico", rolDe: "Recién llegado", para: "Juli", texto: "Fui a mi primer taller sin saber nada y salí con un corazón de latte (bastante torcido, pero corazón).", lugar: "Nómada", hace: "hace 2 días" },
  { id: "m6", tipo: "oportunidad", de: "Juli", rolDe: "Formadora", texto: "Abro dos lugares para mentoría de baristas que recién empiezan. Escribime por acá.", hace: "hace 2 días" },
  { id: "m7", tipo: "recomendacion", de: "Mica", rolDe: "Fan del café", texto: "Para trabajar con laptop: Molienda Centro. Enchufes en la barra y nadie te apura.", lugar: "Centro", hace: "hace 3 días" },
  { id: "m8", tipo: "aprendizaje", de: "Mati", rolDe: "Bar lead", texto: "Calibré el molino tres veces hoy. La humedad cambia todo. Nadie lo ve, pero se nota en la taza.", hace: "hace 3 días" },
  { id: "m9", tipo: "gracias", de: "Café Ámbar", rolDe: "Cafetería", para: "Tomás", texto: "Gracias por el lote de Etiopía. La gente pregunta por él todos los días.", hace: "hace 4 días" },
];

export type CategoriaProducto = "cafe" | "herramientas" | "cursos";

export const CATEGORIAS_PRODUCTO: { id: CategoriaProducto; label: string }[] = [
  { id: "cafe", label: "Café de tostadores aliados" },
  { id: "herramientas", label: "Herramientas" },
  { id: "cursos", label: "Cursos" },
];

export type Producto = {
  id: string;
  nombre: string;
  categoria: CategoriaProducto;
  /** quién está detrás: tostador, barista que lo recomienda o lo enseña */
  quien: string;
  relacion: "Tostado por" | "Recomendado por" | "Lo enseña";
  detalle: string;
  precio: number;
  /** foto en /public/fotos/tienda/<imagen>.jpg (ver CREDITOS_FOTOS) */
  imagen: string;
  profesional?: boolean;
  tueste?: string;
};

export const PRODUCTOS: Producto[] = [
  { id: "huila", nombre: "Colombia Huila · 250 g", categoria: "cafe", quien: "Tomás · Ritual Tostadores", relacion: "Tostado por", detalle: "Dulce, notas a panela y naranja. Ideal para filtrado.", precio: 14500, imagen: "huila", tueste: "24 sep" },
  { id: "etiopia", nombre: "Etiopía lavado · 250 g", categoria: "cafe", quien: "Tomás · Ritual Tostadores", relacion: "Tostado por", detalle: "Floral y cítrico. El que hace preguntar “¿esto es café?”.", precio: 16800, imagen: "etiopia", tueste: "26 sep" },
  { id: "blend", nombre: "Blend de la casa · 500 g", categoria: "cafe", quien: "Nómada", relacion: "Tostado por", detalle: "Chocolate y nuez. Para espresso de todos los días.", precio: 19900, imagen: "blend", tueste: "22 sep" },
  { id: "v60", nombre: "Dripper V60 + 100 filtros", categoria: "herramientas", quien: "Sofi", relacion: "Recomendado por", detalle: "Para empezar a filtrar en casa sin complicarte.", precio: 24500, imagen: "v60" },
  { id: "moka", nombre: "Cafetera italiana · 6 tazas", categoria: "herramientas", quien: "Don Raúl", relacion: "Recomendado por", detalle: "La de toda la vida. Bien usada, hace magia.", precio: 32000, imagen: "moka" },
  { id: "balanza", nombre: "Balanza con timer · 0,1 g", categoria: "herramientas", quien: "Caro", relacion: "Recomendado por", detalle: "Pesar es el secreto que nadie te cuenta. Repetís la receta que te gustó.", precio: 27000, imagen: "balanza", profesional: true },
  { id: "jarra", nombre: "Jarra para latte art · 350 ml", categoria: "herramientas", quien: "Juli", relacion: "Recomendado por", detalle: "Pico fino y buen balance. La que usa en sus talleres.", precio: 18000, imagen: "jarra", profesional: true },
  { id: "curso-filtrados", nombre: "Filtrados en casa · 2 encuentros", categoria: "cursos", quien: "Sofi", relacion: "Lo enseña", detalle: "De la molienda a la taza, sin palabras raras.", precio: 15000, imagen: "curso-filtrados" },
  { id: "curso-tueste", nombre: "Tueste básico para baristas", categoria: "cursos", quien: "Tomás", relacion: "Lo enseña", detalle: "Curvas, desarrollo y cata de lo que tostaste.", precio: 48000, imagen: "curso-tueste", profesional: true },
];

/** Fotos de la tienda: dominio público (CC0) vía Openverse. Editadas con un mismo grade de color. */
export const CREDITOS_FOTOS: { id: string; autor: string; fuente: string; url: string }[] = [
  { id: "huila", autor: "Image Catalog", fuente: "flickr", url: "https://www.flickr.com/photos/132795455@N08/17097173728" },
  { id: "etiopia", autor: "Joshua Willson", fuente: "flickr", url: "https://www.flickr.com/photos/146652545@N06/31845643530" },
  { id: "blend", autor: "megforce1", fuente: "flickr", url: "https://www.flickr.com/photos/35608308@N05/22247100615" },
  { id: "v60", autor: "Kristin Hardwick", fuente: "stocksnap", url: "https://stocksnap.io/photo/pour-over-0PZDINJEXE" },
  { id: "moka", autor: "ajay_suresh", fuente: "flickr", url: "https://www.flickr.com/photos/83136374@N05/55013301353" },
  { id: "balanza", autor: "Kristin Hardwick", fuente: "stocksnap", url: "https://stocksnap.io/photo/pour-over-UE2INO4TXK" },
  { id: "jarra", autor: "Sin autor", fuente: "rawpixel", url: "https://www.rawpixel.com/image/3303274/free-photo-image-coffee-beverage-camera" },
  { id: "curso-filtrados", autor: "Matt Bango", fuente: "stocksnap", url: "https://stocksnap.io/photo/coffee-cup-WUNOWNH63Z" },
  { id: "curso-tueste", autor: "JohannPiber", fuente: "flickr", url: "https://www.flickr.com/photos/151732499@N04/36656069524" },
];

/** Fotos de ambiente de las cafeterías (en /public/fotos/cafeterias/<id>.jpg): CC0 vía Openverse, mismo grade. */
export const CREDITOS_CAFETERIAS: { id: string; autor: string; fuente: string; url: string }[] = [
  { id: "ambar", autor: "Sin autor", fuente: "rawpixel", url: "https://www.rawpixel.com/image/3301932/free-photo-image-interior-cafe" },
  { id: "nomada", autor: "Jeff Sheldon", fuente: "stocksnap", url: "https://stocksnap.io/photo/coffee-cafe-8C35014CE3" },
  { id: "pausa", autor: "Daquella manera", fuente: "flickr", url: "https://www.flickr.com/photos/62518311@N00/194447486" },
  { id: "ritual", autor: "Sin autor", fuente: "rawpixel", url: "https://www.rawpixel.com/image/3303548/free-photo-image-espresso-machine-alloy-wheel-barista" },
  { id: "terraza", autor: "Artem Beliaikin", fuente: "flickr", url: "https://www.flickr.com/photos/157635012@N07/41680343925" },
  { id: "centro", autor: "Sin autor", fuente: "rawpixel", url: "https://www.rawpixel.com/image/3283414/free-photo-image-coffee-shop-tabletop" },
];
