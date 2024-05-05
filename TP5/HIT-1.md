# HIT 1

- Visite https://en.wikipedia.org/wiki/Shader#Pixel_shaders en su versión en inglés y lea atentamente los apartados. Comience a elaborar un informe donde documente someramente los tipos de shaders. En particular nos enfocaremos en los Píxel Shaders que operan en 2D.

  Un **shader** es un programa que calcula los niveles apropiados de luz, oscuridad y color durante el renderizado de una escena 3D. Este proceso es conocido como shading.
  
  Hay tres tipos principales de shaders: pixel, vertex y geometry shaders, con algunos adicionales introducidos recientemente.
  
  En 2D, los shaders actúan sobre imágenes digitales, también conocidas como texturas, modificando atributos de píxeles. Actualmente, el único tipo de shader 2D es el pixel shader, también llamado fragment shader.
  
  Los pixel shaders computan el color y otros atributos de cada fragmento de renderizado, generalmente un píxel. Pueden variar desde simplemente producir un color fijo hasta aplicar efectos complejos como iluminación, sombras y translucidez. Aunque operan en fragmentos individuales, pueden aplicarse efectos de postprocesamiento bidimensionales, como desenfoque o detección de bordes.
  
  Estos shaders son útiles para procesar imágenes 2D y aplicar filtros a secuencias de vídeo después de ser rasterizadas. Son flexibles y pueden ser aplicados en etapas intermedias del proceso de renderizado.
  
  - Visite https://medium.com/trabe/a-brief-introduction-to-webgl-5b584db3d6d6 y agregue a su informe información sobre el pipeline de renderizado. En particular busque relacionarlo con el artículo anterior.
  
  El pipeline de renderizado es la secuencia de etapas que recorre WebGL al momento de renderizar gráficos de tres dimensiones. 
  
  Entender el pipeline de renderizado en WebGL es fundamental para comprender cómo se procesan los gráficos 3D en un navegador web. Este pipeline ejecuta la secuencia de etapas, desde la entrada de datos hasta la salida final en pantalla, y se ejecuta de manera altamente paralela en la GPU.
  
  El output de cada una de las etapas sirve como input de la etapa siguiente.
  
  ![image](https://github.com/Fedesin/sdypp-2024/assets/117539520/f8e95db5-d1bf-4c97-868d-fe59e5987158)
  
  Las etapas del pipeline incluyen el Vertex Shader y el Fragment Shader, que son programables y permiten aplicar transformaciones y efectos a los gráficos. En el artículo anterior, se mencionó cómo los shaders son esenciales para crear gráficos 3D en WebGL, ya que se basan en el lenguaje de sombreado OpenGL, GLSL.
  
  ![image](https://github.com/Fedesin/sdypp-2024/assets/117539520/cc6826ae-fc4a-49c4-9791-ca55c69d85c3)
  
  El vertex shader se encarga de manejar el procesamiento de vértices de nuestros gráficos. Este shader recibe un stream de vértices como input y realiza un mapeo 1:1 con los vértices de salida. En este punto del pipeline podríamos aplicar transformaciones de vértices, como rotaciones, traslaciones o escalas.
  
  El fragment shader procesa un fragmento generado por la etapa de rasterización encargándose de generar colores y texturas para los píxeles en la pantalla. 

 - Divida los 6 pasos del pipeline en aquellos que corresponden al procesamiento 3D, los que corresponden al 2D.

    Podemos dividir las seis etapas del pipeline en aquellas relacionadas al procesamiento 2D y en aquellas relacionadas al procesamiento 3D.
    
    ![image](https://github.com/Fedesin/sdypp-2024/assets/117539520/8d89c29c-bdeb-4bd1-9cce-25a22d915650)

- Visite https://en.wikipedia.org/wiki/Video_post-processing y agregue a su informe conceptos básicos de post-processing, ¿en que etapa del pipeline se ejecutan?

	El post-procesamiento es una técnica utilizada en la industria del video y el cine para mejorar la calidad de la imagen en la reproducción de video, así como en el rendering 3D en tiempo real, como en videojuegos.

  En el contexto de video, el post-procesamiento se lleva a cabo después del proceso de decodificación del video. Puede incluir operaciones como interpolación de imágenes para escalar, reducir o ampliar imágenes, lo que ayuda a ocultar artefactos y defectos en el material original.
  
  En el rendering 3D, el post-procesamiento se realiza después de que la escena se renderiza en un búfer de memoria de la tarjeta de video, antes de ser mostrada en pantalla. Esto implica el uso de shaders de píxeles y, opcionalmente, shaders de vértices para aplicar filtros de post-procesamiento a la imagen antes de su visualización. Algunos efectos pueden requerir múltiples pasadas, manipulación de vértices y acceso al búfer de profundidad.
  
  El post-procesamiento se ejecuta después de la etapa de Fragment Shader en el pipeline de renderizado. Esto permite aplicar efectos que requieren conocimiento de toda la imagen renderizada, ya que normalmente cada objeto 3D se renderiza de forma independiente.

- Diríjase a la web https://www.shadertoy.com la cual nos permite programar de forma interactiva shaders gráficos que corren en GPU gracias al uso de WebGL. Toque en la opción “Nuevo” arriba a la derecha, amplíe las “Entradas del shader”, agregue a su informe un listado de las entradas posibles indicando su tipo, nombre y una descripción breve de qué representa cada una.

- Diríjase a https://www.shadertoy.com/howto y agregue a su informe un listado de las salidas posibles de los Pixel Shaders así como su tipo y una breve descripción de qué representa cada una.

- Cuando crea un nuevo shadertoy el código de ejemplo que le sugiere la web es el siguiente:

    ```C
    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = fragCoord/iResolution.xy;
    
      // Time varying pixel color
      vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    
      // Output to screen
      fragColor = vec4(col,1.0);
    }
    ```

  Con apoyo de internet o lo que considere, explique en profundidad cada parte de este shader “hello world”. Debe explicar como mínimo:
  
  a. **¿Que representa uv?**
  
     Es un vector que contiene las coordenadas normalizadas del pixel actual, es decir, va desde (0,0) en la esquina inferior izquierda hasta (1,1) en la esquina superior derecha de la pantalla.

     Es la conversión del sistema de coordenadas. Shadertoy tiene el display donde muestra los resultados en un sistema de coordenadas que va de por 742x417 por ejemplo. Este espacio lo vamos a transformar a un sistema de coordenadas uv que va 0 a 1 y también tiene una representación axial pero el espacio es distinto.

  b. **¿Por qué es necesario trabajar en uv y no en xy?**
  
     Se trabaja con coordenadas normalizadas en lugar de coordenadas de píxel xy para garantizar que el shader funcione correctamente en diferentes resoluciones de pantalla.

  c. **¿Cómo se logra que el resultado sea una animación siendo que las entradas son estáticas?**
     
     Con la entrada iTime se logra que el resultado sea una animación ya que esta entrada hace que col tenga un valor variante

  d. **¿Cómo es posible que col sea de tipo vec3 siendo que esta igualado a una operacion aritmetica a priori entre flotantes?**

     La función cos() aplicada a un vector de coordenadas y un vector constante produce un nuevo vector que contiene los valores coseno de cada componente de los vectores originales. Por lo tanto, el resultado de la operación 0.5*cos(iTime+uv.xyx+vec3(0,2,4)) es un vector de tres componentes (vec3) que representa un color en el espacio RGB. Esto explica por qué col es de tipo vec3

  e. **¿Cuales son los constructores posibles para vec4? ¿Qué representan los componentes de fragColor? uv se presenta como vec2 pero se utiliza su propiedad xyx, ¿Qué es eso? ¿Qué otras propiedades tiene vec2? ¿y vec3? ¿y vec4?**
   
    Los constructores posibles para vec4 en GLSL son los siguientes:
     
    - *vec4(float x, float y, float z, float w)*: Este constructor crea un vector de cuatro componentes con los valores proporcionados para cada componente, donde:

      x: Representa el componente rojo (Red) del color.
      y: Representa el componente verde (Green) del color.
      z: Representa el componente azul (Blue) del color.
      w: Representa el componente alfa (Alpha) del color, que controla la transparencia.
        
    - *vec4(vec3 xyz, float w)*: Este constructor crea un vector de cuatro componentes utilizando un vector de tres componentes y un valor adicional para el componente alfa.
        
    - *vec4(float val)*: Este constructor crea un vector de cuatro componentes con el mismo valor para todos los componentes (x, y, z, w). Es útil para inicializar un color uniforme.
         
    En cuanto a uv, aunque se declara como vec2, se utiliza su propiedad xyx, que es simplemente una forma de reorganizar los componentes del vector uv. En este contexto, xyx se refiere a (uv.x, uv.y, uv.x), es decir, toma el componente x de uv como el primer componente del nuevo vector, luego toma el componente y de uv como el segundo componente, y finalmente toma nuevamente el componente x y lo coloca como el tercer componente del nuevo vector

    En cuanto a las propiedades de vec2, vec3 y vec4:
  
    - vec2: Representa un vector de dos componentes, x e y, que se utilizan comúnmente para representar coordenadas en 2D.
      
    - vec3: Representa un vector de tres componentes, x, y y z, que se utilizan comúnmente para representar posiciones en 3D o colores RGB.
       
    - vec4: Representa un vector de cuatro componentes, x, y, z y w, que se utilizan comúnmente para representar colores RGBA, donde w controla la transparencia.
