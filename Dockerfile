FROM postgres:9.4
ENV POSTGRES_PASSWORD 123
ENV POSTGRES_DB pgdb
ENV POSTGRES_USER pgdb
ADD setup.sql /docker-entrypoint-initdb.d
EXPOSE 5432