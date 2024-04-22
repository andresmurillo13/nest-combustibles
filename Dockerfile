FROM postgres:14.3

# Instalar PostGIS
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-14-postgis-3 \
    postgresql-14-postgis-3-scripts \
    && rm -rf /var/lib/apt/lists/*