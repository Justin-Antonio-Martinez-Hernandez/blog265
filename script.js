const preguntas = [
    { p: "¿Cual fue el primer juego que intenté crear?", o: ["Void Engine", "Pixel Wars", "Hallucinations", "Project Genesis"], r: 2 },
    { p: "¿Qué es algo que siempre digo que voy a terminar?", o: ["El motor gráfico en C++", "La animación de JJK", "El guion del ARG", "Un clon de Hollow Knight"], r: 1 },
    { p: "¿Qué personaje uso más en Free Fire?", o: ["Moco", "Hayato", "Alok", "Kassie"], r: 3 },
    { p: "¿Qué cosa siempre digo que voy a aprender, pero sigo posponiendo?", o: ["Modelado 3D en Blender", "Cálculo multivariable", "C++ avanzado", "Temas de física de universidad"], r: 3 },
    { p: "¿Cuál ha sido el bug más raro que me ha pasado?", o: ["El motor de físicas colapsaba al fotograma 60", "Una animación no se reproducía aunque estaba bien configurada", "Los shaders invertían los canales RGB al compilar", "La memoria se llenaba por un bucle invisible"], r: 1 },
    { p: "¿Qué proyecto abandoné pero todavía me gustaría retomar?", o: ["Project Void", "Missions", "Neon Story", "CyberCore"], r: 1 },
    { p: "¿Qué canción he repetido tantas veces que ya me la sé de memoria?", o: ["Sweater Weather", "Do I Wanna Know?", "505", "Rhinestone Eyes"], r: 2 },
    { p: "¿Cuál es mi meta más grande en la vida?", o: ["Fundar el próximo OpenAI", "Desarrollar una IA con conciencia", "Ganar un Premio Nobel de Física", "Dirigir un laboratorio en el CERN"], r: 2 },
    { p: "¿Qué profesión me gustaría tener si todo sale como espero?", o: ["Físico de partículas", "Astrofísico", "Ingeniero aeroespacial", "Desarrollador de sistemas cuánticos"], r: 1 },
    { p: "¿Qué teoría física me parece más interesante?", o: ["Mecánica cuántica", "Teoría de cuerdas", "Gravedad cuántica de bucles", "Relatividad de Einstein"], r: 3 },
    { p: "¿Qué habilidad me gustaría dominar este año?", o: ["Lectura rápida de papers", "Hacer cálculos mentalmente", "Cálculo tensorial", "Dominio absoluto de shaders"], r: 1 },
    { p: "¿Cómo prefiero trabajar?", o: ["Siempre en equipo", "Totalmente solo en mi cuarto", "Solo (a menos que el equipo sea muy bueno)", "Liderando un equipo de desarrollo"], r: 2 },
    { p: "¿Qué me gustaría dejar como legado?", o: ["Un motor de código abierto revolucionario", "Un videojuego de culto aclamado", "Una teoría física que explique algo del universo", "Un algoritmo matemático inquebrantable"], r: 2 },
    { p: "¿Qué elegiría: saber todas las respuestas o hacer todas las preguntas correctas?", o: ["Hacer todas las preguntas correctas", "Saber todas las respuestas", "Ninguna, prefiero deducirlo desde cero", "Controlar la aleatoriedad cuántica"], r: 1 },
    { p: "¿Qué haría si despertara con un IQ de 300?", o: ["Resolver las ecuaciones de Navier-Stokes", "Hackear la base de datos de la NASA", "Aprovecharía todo para aprender y descubrir cosas", "Diseñar una teoría del todo antes del almuerzo"], r: 2 },
    { p: "¿Qué pregunta del universo me gustaría responder?", o: ["¿Qué ocurre en la singularidad de un agujero negro?", "¿Cómo unificar la gravedad con la cuántica?", "¿Por qué existe el universo en lugar de no existir nada?", "¿Cuál es el destino final del espacio-tiempo?"], r: 2 },
    { p: "¿Qué significa 'Tide' para mí?", o: ["Es un concepto para un juego", "Es mi apodo", "Es el nombre de un motor gráfico", "Es una abreviación científica"], r: 1 }
];

let i = 0;
let score = 0;
let seleccion = -1;

function comenzar() {
    const nombreInput = document.getElementById("nombre");
    
    if (!nombreInput.value.trim()) {
        nombreInput.style.borderColor = "#ff2d55";
        setTimeout(() => nombreInput.style.borderColor = "#ddd", 1500);
        return;
    }

    document.getElementById("inicio").classList.replace("active", "hidden");
    document.getElementById("quiz").classList.replace("hidden", "active");
    mostrar();
}

function mostrar() {
    const q = preguntas[i];
    
    const progreso = ((i) / preguntas.length) * 100;
    document.getElementById("progress-bar").style.width = progreso + "%";

    document.getElementById("pregunta").innerHTML = 
        `<span style="color:#6c63ff; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;">Pregunta ${i + 1} de ${preguntas.length}</span><br><br>${q.p}`;

    let html = "";
    seleccion = -1; 
    document.getElementById("error-msg").classList.add("hidden");

    q.o.forEach((op, index) => {
        html += `<div class="opcion" onclick="select(${index}, this)">${op}</div>`;
    });

    document.getElementById("opciones").innerHTML = html;
}

function select(index, el) {
    seleccion = index;
    document.getElementById("error-msg").classList.add("hidden");

    document.querySelectorAll(".opcion").forEach(x => {
        x.classList.remove("seleccionada");
    });

    el.classList.add("seleccionada");
}

function siguiente() {
    if (seleccion === -1) {
        document.getElementById("error-msg").classList.remove("hidden");
        return;
    }

    if (seleccion === preguntas[i].r) {
        score++;
    }

    i++;

    if (i >= preguntas.length) {
        document.getElementById("progress-bar").style.width = "100%";
        setTimeout(mostrarFinal, 300); 
        return;
    }

    mostrar();
}

function mostrarFinal() {
    document.getElementById("quiz").classList.replace("active", "hidden");
    document.getElementById("final").classList.replace("hidden", "active");

    document.getElementById("resultado").innerHTML = `Tu resultado: ${score} / ${preguntas.length}`;

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

// 1. Inicializa EmailJS con tu Public Key (Búscala en Account -> Public Key en EmailJS)
// Reemplaza "TU_PUBLIC_KEY_AQUI" por tu clave real
 emailjs.init("WHqOPUlHcTTxGIlHt"); 

function enviarPeticionQuiz() {
    const nombreInput = document.getElementById("crear-nombre").value.trim();
    const contactoInput = document.getElementById("crear-contacto").value.trim();
    const ideasInput = document.getElementById("crear-ideas").value.trim();
    const statusMsg = document.getElementById("crear-status");
    const btnEnviar = document.getElementById("btn-enviar-crear");

    // Validar que no envíen campos vacíos
    if (!nombreInput || !contactoInput || !ideasInput) {
        statusMsg.textContent = "⚠️ ¡Por favor llena todos los datos para saber quién eres!";
        statusMsg.style.color = "#ff2d55";
        statusMsg.classList.remove("hidden");
        return;
    }

    // Cambiar estado del botón mientras envía
    btnEnviar.textContent = "Enviando... ⏳";
    btnEnviar.disabled = true;

    // Estos son los nombres de las variables que usaremos en la plantilla
    const params = {
        nombre_amigo: nombreInput,
        contacto_amigo: contactoInput,
        ideas_quiz: ideasInput
    };

    // Reemplaza "TU_TEMPLATE_ID_AQUI" por el ID de la plantilla
    emailjs.send("service_pe2zkw8", "template_fvxf22g", params)
        .then(() => {
            statusMsg.textContent = "🚀 ¡Petición enviada! Te contactaré pronto.";
            statusMsg.style.color = "#10ac84";
            statusMsg.classList.remove("hidden");
            
            // Limpiar los inputs
            document.getElementById("crear-nombre").value = "";
            document.getElementById("crear-contacto").value = "";
            document.getElementById("crear-ideas").value = "";
            btnEnviar.textContent = "¡Enviado! ✅";
        })
        .catch((error) => {
            console.error("Error de EmailJS:", error);
            statusMsg.textContent = "❌ Hubo un error al enviar. Intenta de nuevo.";
            statusMsg.style.color = "#ff2d55";
            statusMsg.classList.remove("hidden");
            btnEnviar.textContent = "¡Quiero mi Quiz! ✉️";
            btnEnviar.disabled = false;
        });
}
