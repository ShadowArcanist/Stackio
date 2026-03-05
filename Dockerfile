# Stage 1: Builder stage using the optimized Bun image
FROM oven/bun:alpine AS builder

# Set the working directory for the build
WORKDIR /app

# Copy the project files from the build context into the container
COPY . .

# Install dependencies and build the project (output will be in the "out" directory)
RUN bun install && \
    bun run build

# Stage 2: Final NGINX image
FROM nginxinc/nginx-unprivileged:alpine-slim AS final

# Copy the NGINX config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static site output and set ownership and permissions
COPY --from=builder --chown=nginx:nginx /app/out /usr/share/nginx/html

# Set user to nginx
USER nginx

# Expose port 8080 to allow traffic
EXPOSE 8080

HEALTHCHECK --interval=60s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080 || exit 1

# The default command to run the NGINX server
CMD ["nginx", "-g", "daemon off;"]
