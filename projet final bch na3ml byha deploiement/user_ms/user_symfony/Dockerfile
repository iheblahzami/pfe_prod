# Use an official PHP runtime as a parent image
FROM php:7.4-cli
# Set the working directory in the container
WORKDIR /app
# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  unzip \
  libpq-dev \
  libzip-dev \
  curl \
  netcat \
  && docker-php-ext-install pdo_mysql zip \
  && rm -rf /var/lib/apt/lists/*
# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Copy Composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --prefer-dist --no-progress --no-interaction
# Copy the rest of the application code
COPY . /app
# Install Composer autoloader
RUN composer dump-autoload --optimize
# Set correct permissions for var and public directories
RUN mkdir -p var/cache var/log public && \
    chown -R www-data:www-data var public && \
    chmod -R 775 var public
# Expose port 8005 to the outside world
EXPOSE 8005
# Start PHP's built-in web server on HTTP
CMD ["php", "-S", "0.0.0.0:8005", "-t", "public"]
