const COURSE_DATA = [
  {
    moduleId: "mod1",
    title: "Módulo 1 - Números",
    examId: "exam_mod1",
    topics: [
      {
        id: "m1_t1",
        title: "Adición y sustracción con números naturales",
        desc: "Sumas y restas aplicando propiedades básicas.",
        content: `
          <h3>📌 Concepto</h3>
          <p>Los <strong>números naturales</strong> son: $\\{1,2,3,4,5,...\\}$ y se usan para contar.</p>

          <h3>➕ Adición</h3>
          <p>Sumar es juntar cantidades.</p>

          <div class="example-box">
            <p><strong>Ejemplo:</strong></p>
            <p>$345 + 128 = 473$</p>
          </div>

          <h3>➖ Sustracción</h3>
          <p>Restar es quitar una cantidad.</p>

          <div class="example-box">
            <p><strong>Ejemplo:</strong></p>
            <p>$700 - 248 = 452$</p>
          </div>

          <div class="exercise-box">
            <p><strong>✍ Ejercicios:</strong></p>
            <ul>
              <li>$456 + 289 =$</li>
              <li>$900 - 375 =$</li>
              <li>$1200 + 675 =$</li>
            </ul>
          </div>
        `
      },

      {
        id: "m1_t2",
        title: "Multiplicación y división de números naturales",
        desc: "Operaciones fundamentales con números naturales.",
        content: `
          <h3>✖ Multiplicación</h3>
          <p>Multiplicar es sumar repetidamente un mismo número.</p>

          <div class="example-box">
            <p><strong>Ejemplo:</strong></p>
            <p>$24 \\times 5 = 120$</p>
          </div>

          <h3>➗ División</h3>
          <p>Dividir es repartir en partes iguales.</p>

          <div class="example-box">
            <p><strong>Ejemplo:</strong></p>
            <p>$144 \\div 12 = 12$</p>
          </div>

          <div class="exercise-box">
            <p><strong>✍ Ejercicios:</strong></p>
            <ul>
              <li>$36 \\times 7 =$</li>
              <li>$450 \\div 9 =$</li>
              <li>$1200 \\div 15 =$</li>
            </ul>
          </div>
        `
      },

      {
        id: "m1_t3",
        title: "Potencias",
        desc: "Introducción al concepto de potencia y base.",
        content: `
          <h3>📌 ¿Qué es una potencia?</h3>
          <p>Una potencia es una multiplicación repetida.</p>

          <p>Ejemplo: $2^4 = 2 \\cdot 2 \\cdot 2 \\cdot 2 = 16$</p>

          <div class="example-box">
            <p><strong>Ejemplo:</strong></p>
            <p>$5^3 = 5 \\cdot 5 \\cdot 5 = 125$</p>
          </div>

          <div class="exercise-box">
            <p><strong>✍ Ejercicios:</strong></p>
            <ul>
              <li>$3^4 =$</li>
              <li>$10^2 =$</li>
              <li>$6^3 =$</li>
            </ul>
          </div>
        `
      }
    ]
  }
];
