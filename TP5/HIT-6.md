# HIT 6

- Modifique el programa para aplicar un filtro de escala de grises acorde a https://en.wikipedia.org/wiki/Grayscale, luego documente los cambios realizados.

Se añadió la última parte al código anterior, para calcular la escala de grises del resultado previo y luego aplicar al color del píxel el resultado de la escala de grises calculada en base al resultado del código anterior.

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
       	 
	// Calcular la luminancia del píxel
	float luminance = 0.2126 * fragColor.r + 0.7152 * fragColor.g + 0.0722 * fragColor.b;

	// Crear un color en escala de grises con la luminancia calculada
	vec3 grayscaleColor = vec3(luminance);
	 
	//Asignar el color final (imagen en escala de grises) al píxel
	fragColor = vec4(grayscaleColor, 1.0);
}
```

![image](https://github.com/Fedesin/sdypp-2024/assets/117539520/6401d41b-2e5d-4962-8865-6861abb5a175)
