FROM php:8.2-apache

RUN docker-php-ext-install mysqli
RUN a2enmod rewrite

COPY ./Application /var/www/html/
COPY ./default-conf.conf /etc/apache2/sites-available/000-default.conf