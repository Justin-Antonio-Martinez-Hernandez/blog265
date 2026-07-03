// Base de datos de los Quizes creados
const bancoDeQuizes = {
    tide: {
        creador: "Tide",
        preguntas: [
            { p: "¿Cuál fue el primer juego que intenté crear?", o: ["Void Engine", "Pixel Wars", "Hallucinations", "Project Genesis"], r: 2 },
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
        ]
    },
    // AQUÍ AGREGASTE EL NUEVO QUIZ DE TU AMIGO (Ejemplo: Juan)
    juan: {
        creador: "Nayomi",
        preguntas: [
            { p: "¿Cuál es mi comida favorita?", o: ["Pizza", "Hamburguesas", "Tacos", "Sushi"], r: 2 },
            { p: "¿Qué color me gusta más?", o: ["Rojo", "Azul", "Negro", "Verde"], r: 1 },
            { p: "¿A qué hora me suelo dormir?", o: ["10 PM", "12 AM", "2 AM", "No duermo"], r: 2 }
            // Puedes meter aquí todas las preguntas que te mande Juan
        ]
    }
};

// Variables de estado del juego globales
let quizActivo = null;
let preguntas = [];
let i = 0;
let score = 0;
let seleccion = -1;

// Inicializa EmailJS
emailjs.init("WHqOPUlHcTTxGIlHt"); 

// Función para seleccionar cuál Quiz jugar
function seleccionarQuiz(idQuiz) {
    quizActivo = bancoDeQuizes[idQuiz];
    preguntas = quizActivo.preguntas;
    
    // Reiniciar contadores por si ya habían jugado otro antes
    i = 0;
    score = 0;
    seleccion = -1;

    // Personalizar los textos de la pantalla de inicio del Quiz seleccionado
    document.getElementById("titulo-inicio").innerText = `Quiz de ${quizActivo.creador}`;
    
    // Cambiar de pantalla
    document.getElementById("pantalla-seleccion").classList.replace("active", "hidden");
    document.getElementById("inicio").classList.replace("hidden", "active");
}

function volverASeleccion() {
    document.getElementById("inicio").classList.replace("active", "hidden");
    document.getElementById("pantalla-seleccion").classList.replace("hidden", "active");
}

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
    
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        const progreso = (i / preguntas.length) * 100;
        progressBar.style.width = progreso + "%";
    }

    document.getElementById("pregunta").innerHTML = 
        `<span style="color:#6c63ff; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;">Pregunta ${i + 1} de ${preguntas.length}</span><br><br>${q.p}`;

    let html = "";
    seleccion = -1; 
    
    const errorMsg = document.getElementById("error-msg");
    if (errorMsg) errorMsg.classList.add("hidden");

    q.o.forEach((op, index) => {
        html += `<div class="opcion" onclick="select(${index}, this)">${op}</div>`;
    });

    document.getElementById("opciones").innerHTML = html;
}

function select(index, el) {
    seleccion = index;
    
    const errorMsg = document.getElementById("error-msg");
    if (errorMsg) errorMsg.classList.add("hidden");

    document.querySelectorAll(".opcion").forEach(x => {
        x.classList.remove("seleccionada");
    });

    el.classList.add("seleccionada");
}

function siguiente() {
    if (seleccion === -1) {
        const errorMsg = document.getElementById("error-msg");
        if (errorMsg) errorMsg.classList.remove("hidden");
        return;
    }

    if (seleccion === preguntas[i].r) {
        score++;
    }

    i++;

    if (i >= preguntas.length) {
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) progressBar.style.width = "100%";
        
        setTimeout(mostrarFinal, 300); 
        return;
    }

    mostrar();
}

function mostrarFinal() {
    document.getElementById("quiz").classList.replace("active", "hidden");
    document.getElementById("final").classList.replace("hidden", "active");

    document.getElementById("resultado").innerHTML = `Tu resultado: ${score} / ${preguntas.length}`;

    // Mensajes finales dinámicos adaptados al creador del Quiz
    let msg = "";
    if (score === preguntas.length) {
        msg = `💀 Nivel ${quizActivo.creador.toUpperCase()}: ¡Te sabes todo su lore!`;
    } else if (score >= (preguntas.length * 0.7)) {
        msg = `🔥 Eres un amigo muy cercano a ${quizActivo.creador}`;
    } else if (score >= (preguntas.length * 0.4)) {
        msg = `😎 Más o menos conoces a ${quizActivo.creador}`;
    } else {
        msg = `😂 No tienes ni la menor idea de quién es ${quizActivo.creador}`;
    }

    document.getElementById("mensaje").innerHTML = msg;
}

function enviarPeticionQuiz() {
    const nombreInput = document.getElementById("crear-nombre").value.trim();
    const contactoInput = document.getElementById("crear-contacto").value.trim();
    const ideasInput = document.getElementById("crear-ideas").value.trim();
    const statusMsg = document.getElementById("crear-status");
    const btnEnviar = document.getElementById("btn-enviar-crear");

    if (!nombreInput || !contactoInput || !ideasInput) {
        statusMsg.textContent = "⚠️ ¡Por favor llena todos los datos!";
        statusMsg.style.color = "#ff2d55";
        statusMsg.classList.remove("hidden");
        return;
    }

    btnEnviar.textContent = "Enviando... ⏳";
    btnEnviar.disabled = true;

    const params = {
        nombre_amigo: nombreInput,
        contacto_amigo: contactoInput,
        ideas_quiz: ideasInput
    };

    emailjs.send("service_pe2zkw8", "template_fvxf22g", params)
        .then(() => {
            statusMsg.textContent = "🚀 ¡Petición enviada! Le llegará a Tide.";
            statusMsg.style.color = "#10ac84";
            statusMsg.classList.remove("hidden");
            
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
