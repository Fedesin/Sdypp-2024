# Trabajo práctico 2

## Sistemas distribuidos y comunicación

### # HIT 1 ( [Status endpoint](http://35.227.40.69:3000/api/status) ) 

Implemente un servidor que resuelva “tareas genéricas” o “pre-compiladas.

#### Instrucciones de ejecucion

El servidor ya se encuentra corriendo en la nube. Por lo tanto, solo hay que ejecutar la aplicación cliente que se comunicará con él para indicar la ejecución
de un tarea.

1. Moverse al directorio `client`

```bash
cd client <IP_SERVIDOR_TAREAS_REMOTAS>
```

2. Ejecutar la aplicación cliente

```bash
node client.js <IP_SERVIDOR_TAREAS_GENERICAS>
```

### # HIT 2

#### Relevancia y Utilidad del Servicio
- **¿En qué escenarios específicos sería crucial y absolutamente necesario disponer de servicios como el desarrollado en este ejercicio?**

  En general, en cualquier escenario donde se necesite distribuir la carga de trabajo entre múltiples nodos de manera eficiente y gestionar la ejecución de tareas de forma distribuida, un servicio como este sería crucial para coordinar y gestionar la ejecución de las tareas.
    
  Sin embargo, un servicio como el que hemos desarrollado puede facilitar el despliegue, la ejecución y la gestión de microservicios en una arquitectura modular y flexible, permitiendo escalar y ajustar cada microservicio de manera independiente según las necesidades de la aplicación.
    
  El servicio centralizado puede proporcionar una capa de abstracción sobre la ejecución de tareas en los microservicios. Esto facilita la gestión y supervisión de las tareas en toda la arquitectura de microservicios, ya que todas las solicitudes de ejecución de tareas pasan a través del mismo punto de entrada.
    
  Cada tarea genérica se puede implementar como un microservicio independiente. Es decir, cada microservicio puede ser encapsulado en su propia imagen Docker y ejecutado de manera independiente.  De esta manera, podría estar alojado en un servicio de nube como en este caso fue Docker Hub, permitiendo al servidor ejecutar diversos microservicios de manera dinámica.

- **¿Cómo estos servicios podrían beneficiar a las empresas o proyectos en términos de eficiencia, escalabilidad y flexibilidad?**

  Al utilizarse una arquitectura basada en microservicios, donde cada servicio es independiente y se encarga de una funcionalidad específica, el sistema se vuelve más **flexible** y **adaptable a cambios**. Los equipos de desarrollo pueden realizar cambios en un servicio sin afectar a otros servicios, lo que facilita la iteración rápida y la evolución continua del sistema.
    
  Al utilizar una tecnología de contenedores, se puede lograr una **utilización óptima de los recursos disponibles,** aprovechando los recursos de manera más eficiente. Además, el uso de contenedores permite que los servicios puedan ser **desplegados de manera rápida y consistente en cualquier entorno**. Esto facilita la implementación y la gestión de la infraestructura, ya que los servicios pueden ser desplegados de manera uniforme en diferentes entornos, como entornos locales de desarrollo, servidores de pruebas y entornos de producción. 
    
  En cuanto a escalabilidad, se puede **escalar horizontalmente agregando más instancias de contenedores** según sea necesario. Esto significa que cuando la carga de trabajo aumenta, se pueden iniciar automáticamente más contenedores para distribuir la carga y mantener el rendimiento del sistema. Incluso **se pueden escalar microservicios por separado**, lo que permite adaptar la capacidad de cada componente de la aplicación según sus necesidades específicas.
    
  Por ultimo, al distribuir la carga de trabajo entre múltiples contenedores, el sistema se vuelve más **resiliente a fallos**. Si un contenedor falla, el sistema puede redirigir las solicitudes a otros contenedores en funcionamiento, lo que reduce el impacto de los fallos en la disponibilidad del servicio.
  
#### Alternativas de stack tecnológico
- **Además de la arquitectura basada en un Servidor HTTP, ¿qué otras tecnologías alternativas podrían haber sido empleadas para implementar la ejecución de tareas remotas?**
  
  Además de una arquitectura basada en un Servidor HTTP, existen otras tecnologías alternativas que podrían haber sido empleadas para implementar la ejecución de tareas remotas. Algunas de estas tecnologías incluyen:

  - **RPC (Remote Procedure Call):** Se podría implementar un sistema basado en RPC donde el cliente llama a procedimientos remotos en el servidor para ejecutar tareas.
  
  - **Message Queues:** Se podría utilizar un sistema de colas de mensajes para encolar las tareas a ejecutar y que los trabajadores (workers) las procesen de forma asíncrona. Esto es útil en escenarios donde se necesita una comunicación asíncrona y una gestión de tareas distribuidas.
  
  - **Sockets TCP:** Los sockets TCP podrían ser utilizados para establecer una conexión de red entre el cliente y el servidor, permitiendo la comunicación bidireccional y la transferencia de datos de manera eficiente. Con esta tecnología, el cliente podría enviar solicitudes al servidor para ejecutar tareas remotas, y el servidor podría enviar los resultados de vuelta al cliente a través de la misma conexión TCP.

  - **Sistemas de colaboración en tiempo real (RTC):** Herramientas como WebRTC o sistemas de sockets en tiempo real como Socket.io pueden ser utilizados para la comunicación bidireccional entre el cliente y el servidor, permitiendo la ejecución de tareas remotas en tiempo real.

- **¿Qué consideraciones deberían tenerse en cuenta al elegir una tecnología alternativa para garantizar la eficacia y la escalabilidad del sistema?**
  
  Al elegir una tecnología alternativa para garantizar la eficacia y la escalabilidad del sistema, es importante tener en cuenta varias consideraciones clave:
  - **Requisitos del sistema:** Comprender los requisitos específicos del sistema, incluyendo el volumen de datos, la frecuencia de las solicitudes, los tiempos de respuesta esperados y la carga de trabajo prevista.
  - **Escalabilidad:** La tecnología elegida debe ser capaz de escalar horizontal y verticalmente para manejar un aumento en la carga de trabajo y el número de tareas a ejecutar.
  - **Rendimiento:** Se debe evaluar el rendimiento de la tecnología en términos de latencia, tiempo de respuesta y capacidad para manejar grandes volúmenes de tareas concurrentes. 
  - **Interoperabilidad:** Evaluar la capacidad de la tecnología para integrarse con otras herramientas y sistemas existentes en el entorno de operación. La interoperabilidad puede facilitar la adopción y el uso de la tecnología en el contexto de un ecosistema más amplio.
  - **Seguridad:** Asegurarse de que la tecnología cumpla con los requisitos de seguridad necesarios para proteger los datos y las comunicaciones del sistema. Esto incluye considerar aspectos como la autenticación, la autorización, el cifrado y la protección contra vulnerabilidades conocidas.
  - **Costo:** Se debe considerar el costo total de propiedad (TCO) de la tecnología, incluyendo costos de infraestructura, mantenimiento y soporte.
  - **Despliegue y mantenimiento:** La tecnología elegida debe ser fácil de desplegar, configurar y mantener, con herramientas y APIs claras y bien documentadas.
  - **Fiabilidad y tolerancia a fallos:** La tecnología debe ser robusta y tener mecanismos integrados para manejar fallos de manera adecuada, como el reintento de ejecución de tareas o la recuperación de fallos de nodo.

#### Desacoplamiento y Escalabilidad
- **A pesar de que la solución es escalable, se observa una limitación en términos de sincronización entre las partes. ¿Qué estrategias o técnicas podrían implementarse para desacoplar las diferentes partes del sistema y mejorar su escalabilidad?**

  Una estrategia para lograr una solución no limitante en términos de sincronización entre partes sería utilizar un message broker como RabbitMQ, ya que de esta manera se consigue desacoplar las diferentes partes del sistema y mejorar su escalabilidad al hacer que la comunicación entre los componentes sea asincrónica. 

  Utilizando un message broker, los componentes del sistema pueden comunicarse de forma independiente sin necesidad de conocer la ubicación o el estado de los demás. Esto reduce el acoplamiento entre los diferentes servicios, lo que facilita cambios y actualizaciones en el futuro.

   Además, al permitir que los mensajes se envíen de forma asincrónica, un message broker permite que los componentes del sistema trabajen de manera independiente y escalen de manera individual según sea necesario. Esto facilita la escalabilidad horizontal, ya que nuevos nodos o instancias pueden agregarse fácilmente para manejar cargas de trabajo adicionales.
  
- **¿Cómo afectaría la implementación de un sistema de mensajería o eventos en la arquitectura para abordar la limitación de sincronización y mejorar la escalabilidad del sistema?**

  Para implementar un sistema de mensajería o eventos debemos introducir un intermediario de mensajería entre el cliente, el servidor y el servicio tarea. Podemos utilizar una tecnología de mensajería como RabbitMQ o Apache Kafka para gestionar la comunicación asíncrona entre los componentes del sistema. 

  Luego, en lugar de comunicarse directamente entre el cliente, el servidor y el servicio tarea, los componentes enviarán mensajes o eventos al intermediario de mensajería, que luego los enrutará según sea necesario.

  Por último necesitaremos definir el formato de los mensajes o eventos que se enviarán entre los componentes del sistema. Esto podría ser JSON u otro formato adecuado para representar la información necesaria para ejecutar tareas y enviar resultados.
  
- **¿Qué ventajas y desventajas tendría la introducción de un patrón de comunicación asíncrona en comparación con la comunicación síncrona actualmente utilizada?**

  La comunicación síncrona implica una interacción en tiempo real entre los nodos del sistema, donde los mensajes se envían y reciben de manera inmediata. Por otro lado, la comunicación asíncrona permite que los mensajes se envíen y reciban en momentos diferentes, sin la necesidad de que los nodos estén activos simultáneamente.
  La elección entre estos enfoques depende de diversos factores, como la latencia tolerada, la disponibilidad de los nodos y la consistencia de los datos.

  | Característica | Comunicación sincrónica | Comunicación asincrónica |
  |---|---|---|
  | **Interacción en tiempo real** | Sí | No |
  | **Simplicidad** | Alta | Baja |
  | **Orden** | Sí | No |
  | **Latencia** | Baja | Alta |
  | **Escalabilidad** | Baja | Alta |
  | **Disponibilidad** | Baja | Alta |
  | **Eficiencia** | Baja | Alta |
  
  **Ventajas de la comunicación asíncrona**
    
    a. *Tolerancia a fallos*. La comunicación asíncrona puede ser más robusta frente a fallos de red o de los nodos. Si un nodo emisor o receptor no está disponible en el momento exacto de la comunicación, los mensajes           pueden almacenarse temporalmente y enviarse/recibirse en otro momento.
    
    b. *Escalabilidad*. En sistemas distribuidos con un gran número de nodos, la comunicación asíncrona puede escalar mejor que la comunicación síncrona. Esto se debe a que no todos los nodos necesitan estar activos               simultáneamente, lo que reduce la carga en la red y los recursos del sistema.
    
    c. *Flexibilidad en el tiempo de respuesta*: Los nodos pueden procesar mensajes según su disponibilidad y prioridades, lo que permite una mayor flexibilidad en el tiempo de respuesta. Esto es especialmente útil en sistemas donde las operaciones pueden tomar diferentes cantidades de tiempo o donde ciertas tareas tienen prioridad sobre otras.
    
    d. *Mejora del rendimiento*. En algunas situaciones, la comunicación asíncrona puede mejorar el rendimiento general del sistema al evitar bloqueos y esperas innecesarias. Los nodos pueden continuar con otras tareas mientras esperan la respuesta a un mensaje, en lugar de quedarse inactivos y bloqueados
  
  **Desventajas de la comunicación asíncrona**
  
    a. *Posible pérdida de coherencia*: En sistemas distribuidos donde la consistencia de los datos es crítica, la comunicación asíncrona puede dificultar la garantía de la coherencia de los datos entre los nodos. Si los mensajes se entregan en momentos diferentes, podría haber inconsistencia en los datos entre los nodos.
    
    b. *Posible sobrecarga de mensajería*: En sistemas donde hay una gran cantidad de mensajes asíncronos en circulación al mismo tiempo, puede producirse una sobrecarga en la red y un exceso de los recursos del sistema debido al procesamiento, encolado y enrutamiento de mensajes.
  

#### Seguridad y Autenticación
- **¿Qué medidas de seguridad y autenticación deberían implementarse en este servicio para proteger los datos y garantizar la integridad de las transacciones entre el cliente y el servidor?**

   Para proteger los datos y garantizar la integridad de las transacciones entre el cliente y el servidor, se deben implementar, como mínimo, algunas medidas de seguridad como el cifrado, autenticación y la autorización.
  
  Utilizar encriptación para proteger los datos confidenciales durante su transmisión entre el cliente y el servidor, así como mientras están en reposo en el sistema de almacenamiento. Esto ayuda a prevenir la interceptación y el acceso no autorizado a los datos.

  Además, utilizar métodos de autenticación sólidos, como tokens de acceso, certificados SSL/TLS y autenticación de dos factores, para verificar la identidad de los usuarios y asegurar que solo usuarios autorizados puedan acceder al servicio.

  Por último, implementar un sistema de autorización y control de acceso, que especifique los permisos y los niveles de acceso de cada usuario o grupo de usuarios. Esto garantiza que sólo se conceda acceso a los recursos y datos necesarios para cada usuario.

- **¿Cómo se podría mejorar la seguridad de las comunicaciones entre el cliente y el servidor, especialmente al considerar la transferencia de datos sensibles?**

  Los **certificados SSL** y el **protocolo HTTPS** desempeñan un papel fundamental en la protección de datos sensibles durante la transferencia de información entre dos dispositivos a través de la web.

  Los certificados SSL actúan como credenciales digitales que autentican la identidad de un sitio web y cifran la comunicación entre el cliente y el servidor. Emitidos por autoridades de certificación confiables, estos certificados contienen información sobre la identidad del titular del certificado, como el nombre del dominio y la entidad emisora, y se utilizan para establecer una conexión segura y cifrada.

  Cuando un usuario accede a un sitio web protegido por un certificado SSL, su navegador establece una conexión segura utilizando el protocolo HTTPS en lugar de HTTP estándar. HTTPS utiliza cifrado SSL/TLS (cifrado en capa de transporte) para proteger los datos durante la transferencia entre el cliente y el servidor. Este cifrado garantiza que los datos transmitidos no puedan ser interceptados ni modificados por terceros no autorizados, lo que proporciona una capa adicional de seguridad para la comunicación en línea. 

#### Gestión de Errores y Resiliencia
- **¿Qué estrategias deberían implementarse para gestionar errores y fallos en el servicio, tanto en el lado del cliente como en el del servidor?**

  En el lado del cliente, será crucial implementar mecanismos efectivos para el manejo de errores. Esto implica implementar un manejo adecuado de excepciones en el código del cliente para capturar errores y responder de manera apropiada. Esto podría incluir la visualización de mensajes de error amigables para el usuario o la ejecución de acciones de recuperación.

  Además, se deberán aplicar técnicas de recuperación de errores para permitir que la aplicación cliente se recupere cuando se produzcan fallos. Esto podría incluir configurar el cliente para que realice automáticamente reintentos en caso de que se produzca un error temporal, como una conexión perdida o un tiempo de espera agotado. Establece un límite en el número de intentos para evitar la degradación del rendimiento.

  Del lado del servidor, es importante contar con múltiples instancias del servicio desplegadas en diferentes ubicaciones geográficas para distribuir la carga y aumentar la tolerancia a fallos. Utiliza técnicas de replicación de datos para mantener la coherencia entre las instancias.

  Además, diseñar el sistema para que sea tolerante a fallos, lo que significa que pueda seguir funcionando incluso cuando ocurran fallos. Esto podría implicar la implementación de redundancia en los componentes críticos y el diseño de protocolos de comunicación robustos.

  Es sumamente importante implementar un sistema para registrar y analizar activamente los errores y excepciones que ocurran en el servidor, utilizando herramientas de registro para recopilar información detallada sobre los errores, así como también realizar un monitoreo constante de los componentes clave y la configuración de alertas para notificar al equipo de operaciones sobre posibles problemas.
  
- **¿Cómo se podría diseñar el sistema para ser más resiliente ante posibles fallos de red o problemas de disponibilidad de recursos?**

  Dividiendo el sistema en componentes independientes y autónomos (microservicios) que puedan funcionar de forma independiente unos de otros. Esto permite que el sistema continúe operando incluso si uno o varios microservicios fallan.

  Además, se deberían implementar redundancia y escalabilidad mediante la utilización de múltiples servidores y capacidad de escalado automático. 

  Por último, la opción de implementar un balanceo de carga permite distribuir uniformemente la carga entre los servidores disponibles y el uso de cache reduce la dependencia de recursos externos al mantener ciertos datos y operaciones accesibles localmente. 

#### Monitorización y Diagnóstico
- **¿Qué herramientas y técnicas podrían utilizarse para monitorear y diagnosticar el rendimiento y el estado del servicio en tiempo real?**

  La monitorización y alertas permiten a un sistema decirnos cuando algo está roto, o quizás, cuando va a romperse. Para monitorear y diagnosticar el rendimiento y el estado del servicio en tiempo real en sistemas distribuidos, existen varias herramientas y técnicas disponibles.

  Para el de *monitoreo de infraestructura*, existen herramientas como **Prometheus**, el cuál es un sistema de monitoreo y alerta de código abierto diseñado para escalar y ser altamente adaptable a diferentes entornos. Permite recopilar métricas de sistemas distribuidos y generar alertas en tiempo real. También otra herramienta como **Grafana**, la cuál se integra bien con la anterior y con otras fuentes de datos para proporcionarnos visualizaciones personalizadas y tableros de control que permiten supervisar el rendimiento del sistema en tiempo real.

  Para el *análisis de logs*, tenemos herramientas como el ELK Stack que incluye tres herramientas: Elasticsearch, Logstash, Kibana. Esta pila de herramientas permite recopilar, procesar y visualizar registros en tiempo real. **Elasticsearch** almacena los datos de registro, **Logstash** los procesa y **Kibana** proporciona una interfaz de usuario para la visualización y el análisis de los registros.

  Para el *monitoreo de actividad de red*, tenemos **Wireshark**, la cuál es una herramienta de análisis de protocolos de red que permite capturar y analizar el tráfico de red en tiempo real. Puede ser útil para diagnosticar problemas de rendimiento y seguridad en sistemas distribuidos.

  Por último, para la *supervisión de contenedores y orquestadores*, tenemos **Docker Stats** y **Kubernetes Metrics API**. Estas herramientas proporcionan métricas de rendimiento y estado de contenedores y clústeres de Kubernetes, permitiendo monitorear y diagnosticar problemas en tiempo real.
  
- **¿Qué métricas serían importantes de rastrear para evaluar el rendimiento y la eficacia del servicio?**

    - **Tiempo de respuesta**. Mide el tiempo que tarda el servicio en responder a una solicitud. Esto puede incluir el tiempo de procesamiento en el servidor, así como el tiempo de latencia de red. Un tiempo de respuesta más bajo generalmente indica un mejor rendimiento del servicio.

    - **Tasa de errores**. Rastrea el número de solicitudes que resultan en errores. Esta métrica cuantifica la tasa de solicitudes fallidas. Los errores pueden ser explícitos (como los errores HTTP 500), implícitos (por ejemplo, una respuesta correcta HTTP 200 con contenido erróneo), o definidos por política (por ejemplo, cualquier solicitud que exceda un tiempo de respuesta comprometido se considera un error). Monitorear errores requiere una estrategia que abarque desde la detección de fallos completos en el balanceador de carga hasta pruebas de sistema de extremo a extremo para errores más sutiles. Una alta tasa de errores puede indicar problemas en el servicio que deben abordarse.
       
    - **Latencia**. Representa el tiempo total que tarda una solicitud en viajar desde el cliente hasta el servidor y viceversa. Una baja latencia es crucial para garantizar una experiencia de usuario fluida y ágil. Se refiere al tiempo que tarda en procesarse una solicitud. Es importante distinguir entre las solicitudes que han sido atendidas y las solicitudes fallidas. Por ejemplo, un error HTTP 500 por la pérdida de conexión con una base de datos u otro backend puede procesarse rápidamente, pero sigue siendo un indicador de fallo. Por tanto, incluir estos errores en el cálculo de la latencia general puede llevar a interpretaciones erróneas. Además, un error lento es aún más problemático que un error rápido, lo que hace vital rastrear la latencia de los errores.

    - **Disponibilidad**. Mide la proporción de tiempo durante el cual el servicio está disponible y operativo. Una alta disponibilidad es fundamental para garantizar la accesibilidad del servicio a los usuarios finales.

    - **Utilización de recursos**. Rastrea la cantidad de recursos del sistema, como CPU, memoria y almacenamiento, que están siendo utilizados por el servicio. Esto ayuda a identificar posibles cuellos de botella y a   optimizar el uso de recursos.
  La saturación no solo se mide por el uso actual, sino también por la capacidad del sistema para manejar cargas crecientes. La latencia suele ser un indicador anticipado de saturación, y medir tiempos de respuesta en percentiles altos (como el 99%) en ventanas cortas de tiempo puede alertar tempranamente sobre posibles saturaciones. También es importante predecir la saturación inminente, como un disco duro que se llenará en unas horas.

    - **Tamaño de la cola**. En entornos donde se utilizan colas de mensajes, rastrear el tamaño de la cola puede ayudar a evaluar la eficacia del sistema para manejar la carga de trabajo entrante y detectar posibles problemas de congestión.


#### Escalabilidad y Rendimiento
- **¿Cómo se podría escalar vertical u horizontalmente el servicio para manejar cargas de trabajo variables y picos de tráfico?**

  Para escalar vertical u horizontalmente el servicio y manejar cargas de trabajo variables y picos de tráfico, se pueden implementar las siguientes estrategias:

  - **Escalado vertical:** Implica aumentar los recursos de hardware, como la capacidad de procesamiento, la memoria y el almacenamiento, en el servidor que ejecuta el servicio. Esto puede implicar migrar a una instancia de servidor más potente o agregar más recursos, como CPU y RAM, a la instancia existente.
      
  - **Escalado horizontal:** implica implementar un sistema de balanceo de carga para distribuir las solicitudes entre múltiples instancias del servicio que se ejecutan en varios servidores. Esto puede ayudar a distribuir la carga de manera uniforme y mejorar la capacidad de respuesta del sistema.
    Utilizar tecnologías de contenedores, como Docker y Kubernetes, para crear y gestionar múltiples instancias del servicio de manera rápida y eficiente. Esto facilita la escalabilidad horizontal al permitir la creación rápida de nuevos contenedores según sea necesario para manejar picos de tráfico.
    Utilizar servicios en la nube que ofrecen capacidades de escalado automático, como Google Kubernetes Engine (GKE). Estos servicios pueden ajustar automáticamente la cantidad de recursos asignados a las instancias del servicio en función de la carga de trabajo en tiempo real, lo que garantiza un rendimiento óptimo sin intervención manual.
      
  Una estrategia eficaz podría ser **combinar ambas técnicas**, escalando verticalmente para manejar cargas de trabajo más pesadas y escalando horizontalmente para distribuir la carga y aumentar la capacidad de procesamiento de manera más flexible y eficiente.
  
- ¿**Qué consideraciones de diseño y configuración podrían influir en el rendimiento y la escalabilidad del servicio a largo plazo?**

  Consideraciones de diseño y configuración que podrían influir en el rendimiento y la escalabilidad del servicio a largo plazo incluyen la elección de una arquitectura escalable, la optimización de recursos, la implementación de sistemas de monitoreo en tiempo real, el uso de escalado automático, la selección de tecnologías de almacenamiento eficientes y la planificación de capacidad a largo plazo. Estas decisiones impactan directamente en la capacidad del sistema para manejar la carga de trabajo creciente y adaptarse a las necesidades cambiantes, asegurando un rendimiento óptimo a lo largo del tiempo.
