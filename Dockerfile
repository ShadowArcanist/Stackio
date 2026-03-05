# Stage 1: Builder stage using the optimized Bun image
FROM oven/bun:alpine AS builder

# Set build arguments for environment variables
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ARG NEXT_PUBLIC_UMAMI_SCRIPT_URL
ARG VERSION

# Set environment variables
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_UMAMI_SCRIPT_URL=$NEXT_PUBLIC_UMAMI_SCRIPT_URL
ENV VERSION=$VERSION

# Set the working directory for the build
WORKDIR /app

# Copy package files first for caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy remaining project files
COPY . .

# Build the project (output will be in the "out" directory)
RUN bun run build

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
