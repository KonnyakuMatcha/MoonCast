# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl python3 xz-utils \
    && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://cli.moonbitlang.com/install/unix.sh | bash
ENV PATH="/root/.moonbit/bin:${PATH}"
WORKDIR /src
COPY . .
RUN ./scripts/build.sh

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=build /src/server.py ./server.py
COPY --from=build /src/static ./static
EXPOSE 8000
CMD ["python3", "server.py", "--host", "0.0.0.0", "--port", "8000"]
