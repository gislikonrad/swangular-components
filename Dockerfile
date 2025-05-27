# Pull desired version of node docker to use as builder base
# https://hub.docker.com/_/node
FROM node:8

# Set build dir and copy project files
RUN mkdir -p /src
VOLUME /src
WORKDIR /scripts

COPY --chmod=755 <<EOT entrypoint.sh
#!/bin/bash
cd /src && npm i && ng serve --host 0.0.0.0
EOT

ENV PATH=/src/node_modules/@angular/cli/bin/:$PATH

EXPOSE 4200
ENTRYPOINT ["/scripts/entrypoint.sh"]