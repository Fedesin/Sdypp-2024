# HIT 4

Utilizando como punto de partida el HIT#3 y sin perder de vista lo que documentó en los hits anteriores, modifique el código para poner la imagen cabeza abajo, es decir aplicar lo que comúnmente se llama un efecto de FLIPY o voltear vertical. Luego haga el FLIPX o voltee horizontal (también llamado espejo).

Resultado:

```C
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {    
 
  vec2 uv = (fragCoord.xy / iResolution.xy);  
  
  //vamos a hacer el FLIPY
   
  uv.y = 1.0 - uv.y;
   
  //ahora vamos a hacer el FLIPX
   
  uv.x= 1.0 - uv.x;
   
  fragColor = texture(iChannel0, uv);
}
```

![image](https://github.com/Fedesin/sdypp-2024/assets/117539520/e79af1fa-111b-40f2-a4c9-4f41dd627950)

- Si no lo había hecho previamente, amplíe su informe sobre la potencialidad de UV.

  Como lo habíamos expresado previamente UV sirve para normalizar el cambio de coordenadas y de esta manera podemos realizar una modificación en los gráficos y que esto se aplique igual para todos los tipos de resoluciones distintas que pueden haber.
