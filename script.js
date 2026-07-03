const preguntas = [
{
p: "¿Cuál fue el primer juego que intenté crear?",
o: ["Hallucinations", "Void Engine", "Pixel Wars", "Missions"],
r: 0
},
{
p: "¿Qué es algo que siempre digo que voy a terminar?",
o: ["La animación de JJK", "Un servidor de Discord", "Un juego RPG", "Un mapa de Minecraft"],
r: 0
},
{
p: "¿Qué personaje uso más en Free Fire?",
o: ["Kassie", "Alok", "Hayato", "Kelly"],
r: 0
},
{
p: "¿Qué cosa siempre digo que voy a aprender, pero sigo posponiendo?",
o: ["Temas de física de universidad", "Programación avanzada", "Inglés fluido", "Dibujo digital"],
r: 0
},
{
p: "¿Cuál ha sido el bug más raro que me ha pasado?",
o: [
"Una animación no se reproducía aunque estaba bien configurada",
"El juego se cerraba sin error",
"Un objeto atravesaba todo",
"El personaje flotaba sin razón"
],
r: 0
},
{
p: "¿Qué proyecto abandoné pero todavía me gustaría retomar?",
o: ["Missions", "Project Void", "Skyline ARG", "Neon Story"],
r: 0
},
{
p: "¿Qué canción he repetido tantas veces que ya me la sé de memoria?",
o: ["505", "Blinding Lights", "Faded", "Sweater Weather"],
r: 0
},
{
p: "¿Cuál es mi meta más grande en la vida?",
o: ["Ganar un Premio Nobel de Física", "Crear un estudio de juegos", "Ser famoso en internet", "Trabajar en Google"],
r: 0
},
{
p: "¿Qué profesión me gustaría tener si todo sale como espero?",
o: ["Astrofísico", "Ingeniero de software", "Game developer", "Investigador"],
r: 0
},
{
p: "¿Qué teoría física me parece más interesante?",
o: ["Relatividad de Einstein", "Mecánica cuántica", "Teoría de cuerdas", "Termodinámica"],
r: 0
},
{
p: "¿Qué habilidad me gustaría dominar este año?",
o: ["Hacer cálculos mentalmente", "Dibujar", "Programar más rápido", "Aprender japonés"],
r: 0
},
{
p: "¿Cómo prefiero trabajar?",
o: [
"Solo (a menos que el equipo sea muy bueno)",
"Siempre en equipo",
"Siempre solo",
"Depende del día"
],
r: 0
},
{
p: "¿Qué me gustaría dejar como legado?",
o: [
"Una teoría física que explique algo del universo",
"Un juego famoso",
"Una empresa grande",
"Una comunidad de desarrolladores"
],
r: 0
},
{
p: "¿Qué elegiría: saber todas las respuestas o hacer todas las preguntas correctas?",
o: [
"Saber todas las respuestas",
"Hacer todas las preguntas correctas",
"Ninguna, prefiero descubrirlo solo",
"Depende del momento"
],
r: 0
},
{
p: "¿Qué haría si despertara con un IQ de 300?",
o: [
"Aprovecharía todo para aprender y descubrir cosas",
"Me volvería millonario rápido",
"Haría juegos perfectos",
"Resolvería problemas del mundo"
],
r: 0
},
{
p: "¿Qué pregunta del universo me gustaría responder?",
o: [
"¿Por qué existe el universo en lugar de no existir nada?",
"¿Qué hay después de la muerte?",
"¿Qué hay dentro de un agujero negro?",
"¿Estamos solos en el universo?"
],
r: 0
},
{
p: "¿Qué significa 'Tide' para mí?",
o: [
"Es mi apodo",
"Es un proyecto",
"Es un personaje",
"Es una marca"
],
r: 0
}
];

let i = 0;
let score = 0;
let seleccion = -1;

function comenzar() {
const nombre = document.getElementById("nombre").value;
if (!nombre) return;

document.getElementById("inicio").style.display = "none";
document.getElementById("quiz").style.display = "block";
mostrar();
}

function mostrar() {
const q = preguntas[i];

document.getElementById("pregunta").innerHTML =
`Pregunta ${i + 1}/${preguntas.length}<br><br>${q.p}`;

let html = "";
seleccion = -1;

q.o.forEach((op, index) => {
html += `<div class="opcion" onclick="select(${index}, this)">${op}</div>`;
});

document.getElementById("opciones").innerHTML = html;
}

function select(index, el) {
seleccion = index;

document.querySelectorAll(".opcion")
.forEach(x => x.classList.remove("seleccionada"));

el.classList.add("seleccionada");
}

function siguiente() {
if (seleccion === -1) return;

if (seleccion === preguntas[i].r) {
score++;
}

i++;

if (i >= preguntas.length) {
mostrarFinal();
return;
}

mostrar();
}

function mostrarFinal() {
document.getElementById("quiz").style.display = "none";
document.getElementById("final").style.display = "block";

document.getElementById("resultado").innerHTML =
`Tu resultado: ${score}/${preguntas.length}`;

let msg = "";

if (score === preguntas.length) {
msg = "💀 Nivel TIDE: te sabes TODO";
} else if (score >= 12) {
msg = "🔥 Muy cercano a conocer el lore de Tide";
} else if (score >= 7) {
msg = "😎 Más o menos me conoces";
} else {
msg = "😂 No tienes idea quién es Tide";
}

document.getElementById("mensaje").innerHTML = msg;
    }
