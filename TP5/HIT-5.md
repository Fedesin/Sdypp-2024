# HIT 5

Tomando como base el ejemplo anterior, en iChannel1 agregue una fuente de textura de video, puede usar el de ejemplo de Britney Spears. Quite los efectos flips y muestre la nueva textura en lugar de la de iChannel0. 

Va a implementar ahora un filtro chroma básico, su objetivo es cambiar el color de los píxeles verdes del fondo por el video proveniente de iChannel0 (su webcam) para poder bailar como malocorista detrás de Britney Spears (el baile es opcional pero altamente recomendable).

Para implementar un filtro chroma primero necesitará recordar algunos conceptos matemáticos en particular el que proviene de la geometría, y es la distancia pitagórica en N dimensiones (si, la fórmula esa del triángulo rectángulo pero en N dimensiones). 

Vamos pasito a pasito como decía mostaza merlo hasta poder unir todas la piezas (https://www.youtube.com/watch?v=cGBvmbtpLcE). 

1. En primer lugar tiene que definir el color del chroma dentro de un vec4.

2. Luego tiene que definir un umbral de chroma dentro de un float.

3. Luego tiene que calcular la distancia entre el color del iChannel1 y el color del chroma con el teorema de distancia pitagórica en n dimensiones, siendo n=3.

4. Finalmente elegir si mostrar la textura de un canal u otro en funcion de si la distancia supera o no el umbral establecido.

5. Modifique el umbral a diferentes valores. Analice los resultados. Documente la experiencia. Haga screenshots bailando como malocorista con el efecto chroma (opcional).

```C
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {    
	// Normalized pixel coordinates (from 0 to 1)
	vec2 uv = fragCoord.xy / iResolution.xy;

	vec3 green = vec3(39.0/255.0, 128.0/255.0, 24.0/255.0);
    
	// Obtener el color del video de Britney Spears de iChannel1
	vec4 videoColor = texture(iChannel1, uv);

	// Obtener el color del fondo del video de iChannel0
	vec4 backgroundImage = texture(iChannel0, uv);

	// Definir el umbral para la diferencia de color
	float threshold = 0.15;
	float threshold2 = 0.25;
	fragColor = texture(iChannel1,uv);
	if (
    	(abs(green.r-videoColor.r)<threshold)&&
    	(abs(green.g-videoColor.g)<threshold)&&
    	(abs(green.b-videoColor.b)<threshold)
    	){
       	fragColor.r=backgroundImage.r;
       	fragColor.g=backgroundImage.g;
       	fragColor.b=backgroundImage.b;
     	}else if (
       	(abs(green.r-videoColor.r)<threshold2)&&
       	(abs(green.g-videoColor.g)<threshold2)&&
       	(abs(green.b-videoColor.b)<threshold2)
       	){
          	fragColor.r*=backgroundImage.r;
          	fragColor.g*=backgroundImage.g;
          	fragColor.b*=backgroundImage.b;
        	}
}
```

![image](https://github.com/Fedesin/sdypp-2024/assets/117539520/88ac9185-139f-4cf6-b8dc-085b5e2bacf2)
