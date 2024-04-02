# Trabajo práctico 2

## Sistemas distribuidos y comunicación

### # HIT 1 ( [Status endpoint](http://35.227.40.69:3000/api/status) ) 

Implemente un servidor que resuelva “tareas genéricas” o “pre-compiladas.

#### Instrucciones de ejecucion

El servidor ya se encuentra corriendo en la nube. Por lo tanto, solo hay que ejecutar la aplicación cliente que se comunicará con él para indicar la ejecución
de un tarea.

1. Moverse al directorio `client`

```bash
cd client
```

2. Ejecutar la aplicación cliente.

```bash
node client.js
```

### # HIT 2

#### Relevancia y Utilidad del Servicio
- **¿En qué escenarios específicos sería crucial y absolutamente necesario disponer de servicios como el desarrollado en este ejercicio?**

  En general, en cualquier escenario donde se necesite distribuir la carga de trabajo entre múltiples nodos de manera eficiente y gestionar la ejecución de tareas de forma distribuida, un servicio como este sería crucial para coordinar y gestionar la ejecución de las tareas.
    
  Sin embargo, un servicio como el que hemos desarrollado puede facilitar el despliegue, la ejecución y la gestión de microservicios en una arquitectura modular y flexible, permitiendo escalar y ajustar cada microservicio de manera independiente según las necesidades de la aplicación.
    
  El servicio centralizado puede proporcionar una capa de abstracción sobre la ejecución de tareas en los microservicios. Esto facilita la gestión y supervisión de las tareas en toda la arquitectura de microservicios, ya que todas las solicitudes de ejecución de tareas pasan a través del mismo punto de entrada.
    
  Cada tarea genérica se puede implementar como un microservicio independiente. Es decir, cada microservicio puede ser encapsulado en su propia imagen Docker y ejecutado de manera independiente.  De esta manera, podría estar alojado en un servicio de nube como en este caso fue Docker Hub, permitiendo al servidor ejecutar diversos microservicios de manera dinámica.

  El servicio centralizado puede proporcionar una capa de abstracción sobre la ejecución de tareas en los microservicios. Esto facilita la gestión y supervisión de las tareas en toda la arquitectura de microservicios, ya que todas las solicitudes de ejecución de tareas pasan a través del mismo punto de entrada.

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
  
  - **Sockets TCP:** Los sockets TCP podrían ser utilizados para establecer una conexión de red entre el cliente y el servidor, permitiendo la comunicación bidireccional y la transferencia de datos de manera eficiente. Con esta tecnología, el cliente podría enviar solicitudes al servidor para ejecutar tareas remotas, y el servidor podría enviar los resultados de vuelta al cliente a través de la misma conexión TCP
  
- **¿Qué consideraciones deberían tenerse en cuenta al elegir una tecnología alternativa para garantizar la eficacia y la escalabilidad del sistema?**
  
  Al elegir una tecnología alternativa para garantizar la eficacia y la escalabilidad del sistema, es importante tener en cuenta varias consideraciones clave:
  - **Requisitos del sistema:** Comprender los requisitos específicos del sistema, incluyendo el volumen de datos, la frecuencia de las solicitudes, los tiempos de respuesta esperados y la carga de trabajo prevista. Esto ayudará a determinar qué tecnología es la más adecuada para satisfacer las necesidades del sistema.
  - **Escalabilidad:** Evaluar la capacidad de la tecnología para escalar horizontal y verticalmente según sea necesario. Esto incluye considerar cómo la tecnología maneja el aumento en el número de usuarios, la cantidad de datos y la complejidad de las operaciones.
  - **Rendimiento:** Analizar el rendimiento de la tecnología en términos de velocidad de procesamiento, latencia, uso de recursos y capacidad para manejar cargas de trabajo pesadas.
  - **Interoperabilidad:** Evaluar la capacidad de la tecnología para integrarse con otras herramientas y sistemas existentes en el entorno de operación. La interoperabilidad puede facilitar la adopción y el uso de la tecnología en el contexto de un ecosistema más amplio.
  - **Seguridad:** Asegurarse de que la tecnología cumpla con los requisitos de seguridad necesarios para proteger los datos y las comunicaciones del sistema. Esto incluye considerar aspectos como la autenticación, la autorización, el cifrado y la protección contra vulnerabilidades conocidas.

#### Desacoplamiento y Escalabilidad
- A pesar de que la solución es escalable, se observa una limitación en términos de sincronización entre las partes. ¿Qué estrategias o técnicas podrían implementarse para desacoplar las diferentes partes del sistema y mejorar su escalabilidad?
  
- ¿Cómo afectaría la implementación de un sistema de mensajería o eventos en la arquitectura para abordar la limitación de sincronización y mejorar la escalabilidad del sistema?
  
- ¿Qué ventajas y desventajas tendría la introducción de un patrón de comunicación asíncrona en comparación con la comunicación síncrona actualmente utilizada?

#### Seguridad y Autenticación
- ¿Qué medidas de seguridad y autenticación deberían implementarse en este servicio para proteger los datos y garantizar la integridad de las transacciones entre el cliente y el servidor?
  
- ¿Cómo se podría mejorar la seguridad de las comunicaciones entre el cliente y el servidor, especialmente al considerar la transferencia de datos sensibles?

#### Gestión de Errores y Resiliencia
- ¿Qué estrategias deberían implementarse para gestionar errores y fallos en el servicio, tanto en el lado del cliente como en el del servidor?
  
- ¿Cómo se podría diseñar el sistema para ser más resiliente ante posibles fallos de red o problemas de disponibilidad de recursos?

#### Monitorización y Diagnóstico
- ¿Qué herramientas y técnicas podrían utilizarse para monitorear y diagnosticar el rendimiento y el estado del servicio en tiempo real?
  
- ¿Qué métricas serían importantes de rastrear para evaluar el rendimiento y la eficacia del servicio?

#### Escalabilidad y Rendimiento
- ¿Cómo se podría escalar vertical u horizontalmente el servicio para manejar cargas de trabajo variables y picos de tráfico?
  Para escalar vertical u horizontalmente el servicio y manejar cargas de trabajo variables y picos de tráfico, se pueden implementar las siguientes estrategias:

  - **Escalado vertical:** Implica aumentar los recursos de hardware, como la capacidad de procesamiento, la memoria y el almacenamiento, en el servidor que ejecuta el servicio. Esto puede implicar migrar a una instancia de servidor más potente o agregar más recursos, como CPU y RAM, a la instancia existente.
    Por otro lado, se puede buscar optimizar y ajustar la configuración del servidor y del software para aprovechar al máximo los recursos disponibles y mejorar el rendimiento del sistema. 
      
  - **Escalado horizontal:** implica implementar un sistema de balanceo de carga para distribuir las solicitudes entre múltiples instancias del servicio que se ejecutan en varios servidores. Esto puede ayudar a distribuir la carga de manera uniforme y mejorar la capacidad de respuesta del sistema.
    Utilizar tecnologías de contenedores, como Docker o Kubernetes, para crear y gestionar múltiples instancias del servicio de manera rápida y eficiente. Esto facilita la escalabilidad horizontal al permitir la creación rápida de nuevos contenedores según sea necesario para manejar picos de tráfico.
    Utilizar servicios en la nube que ofrecen capacidades de escalado automático, como Google Kubernetes Engine (GKE). Estos servicios pueden ajustar automáticamente la cantidad de recursos asignados a las instancias del servicio en función de la carga de trabajo en tiempo real, lo que garantiza un rendimiento óptimo sin intervención manual.
      
  - Una estrategia eficaz podría ser **combinar ambas técnicas**, escalando verticalmente para manejar cargas de trabajo más pesadas y escalando horizontalmente para distribuir la carga y aumentar la capacidad de procesamiento de manera más flexible y eficiente. Por ejemplo, se podría comenzar escalando verticalmente para satisfacer la demanda inicial y luego, si la carga de trabajo continúa aumentando, implementar la escalabilidad horizontal para agregar más capacidad de procesamiento según sea necesario.
  
- ¿Qué consideraciones de diseño y configuración podrían influir en el rendimiento y la escalabilidad del servicio a largo plazo?
