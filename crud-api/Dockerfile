FROM php:8.3-cli

WORKDIR /app

COPY src/ src/
COPY data/ data/

RUN chmod -R 777 data/

ENV PORT=10000
EXPOSE 10000

CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-10000} -t src/public src/public/index.php"]
