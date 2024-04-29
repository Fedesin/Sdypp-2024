FROM python:3.9.19-bullseye

WORKDIR /sobel

COPY ./requirements.txt requirements.txt

RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx

RUN pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

COPY ./server.py server.py
COPY ./sobel_filter.py sobel_filter.py

EXPOSE 5000

CMD ["flask", "--app", "server", "run", "--host", "0.0.0.0"]
