FROM python:3.9.19-bullseye

WORKDIR /sobel

COPY ./requirements.txt requirements.txt

RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx

RUN pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

COPY ./server.py server.py
COPY ./sobel_filter.py sobel_filter.py

# # Verificar si el grupo noroot ya existe antes de intentar crearlo
# RUN addgroup --gid 6585 noroot

# # Crear un usuario no root llamado "user" y agregarlo al grupo "noroot"
# RUN adduser -u 6585 -G noroot -s /bin/sh -D user

# RUN chown -R user:noroot .
# RUN chmod -R 500 .

# # Cambiar al usuario no root
# USER user

EXPOSE 5000

# ENV FLASK_APP=server.py

CMD ["flask", "--app", "server", "run", "--host", "0.0.0.0"]

# flask --app server run