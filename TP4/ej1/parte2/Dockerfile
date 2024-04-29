FROM python:3.9.19-bullseye

# Crear un usuario no root
RUN useradd -m -d /home/nonroot -s /bin/bash nonroot

WORKDIR /split-join

# Instalar dependencias del sistema
RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx

# Copiar archivos y directorios
COPY ./requirements.txt requirements.txt
COPY ./server.py server.py
COPY ./image_utils.py image_utils.py

# Cambiar la propiedad de los archivos al usuario no root
RUN chown -R nonroot:nonroot /split-join

# Cambiar al usuario no root.
USER nonroot

# Instalar las dependencias de Python
RUN pip install --upgrade pip setuptools && \
    pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "-m", "flask", "--app", "server", "run", "--host", "0.0.0.0"]