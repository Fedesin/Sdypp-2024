# HIT 3

Hora de ensuciarse las manos, utilizando shadertoy seleccione en iChannel0 una fuente de textura para poder continuar esta guía, puede ser una imagen de ejemplo, un video de ejemplo o para hacerlo más entretenido, su cámara web.

El siguiente shader muestra de forma trivial como copiar los pixeles desde el iChannel0 a la salida:

  ```C
  void mainImage( out vec4 fragColor, in vec2 fragCoord ) {    
    vec2 uv = (fragCoord.xy / iResolution.xy);  
    fragColor = texture(iChannel0, uv);   		 
  }
  ```

![image](https://github.com/Fedesin/sdypp-2024/assets/117539520/010a71cd-7e03-4e8c-81e9-b6dcad0a7758)
