# COS221_Assignment5

## Quick Guide to Running CompareIt on your device

### Windows
#### Prerequisites:
- [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) installed with any Ubuntu distribution deployed
- [MariaDB](https://www.geeksforgeeks.org/how-to-install-configure-mariadb-on-ubuntu/) installed on WSL 
- [XAMPP](https://www.apachefriends.org/) installed on Windows

#### Setting everything up:
- Start a WSL session
- Navigate to the `htdocs` XAMPP directory. It can usually be found at `/mnt/c/xampp/htdocs`
- Clone the repository
  ```
  git clone https://github.com/COS221-Assignment5-IndexFive/COS221_Assignment5.git
  cd COS221_Assignment5
  ```
- Create a `.env` file in the root folder of the project (on the same level as the `setup.sh` file) with the following structure:

```
DB_HOST=<your MariaDB host (i.e. localhost)>
DB_NAME=index5_db
DB_USER=<your MariaDB user>
DB_PASS=<your MariaDB password>
```
- Make the setup script executable and run it
```
  sudo chmod +x setup.sh`
  ./setup.sh
```
- CompareIt should now be running at http://localhost/COS221_Assignment5/Application/Login/php/login.php

### Linux

#### Prerequisites:

* A Debian-based distro (e.g. Ubuntu 20.04+)
* Apache 2, PHP (with mysqli) and MariaDB installed:

  ```bash
  sudo apt update
  sudo apt install apache2 mariadb-server php php-mysqli git -y
  ```
* Services running:

  ```bash
  sudo systemctl enable --now apache2
  sudo systemctl enable --now mariadb
  ```

#### Setting everything up:

- Navigate to your web-root and clone the repo:

   ```bash
   cd /var/www/html
   sudo git clone https://github.com/COS221-Assignment5-IndexFive/COS221_Assignment5.git
   ```
- Change into the project directory:

   ```bash
   cd COS221_Assignment5
   ```
- Create a `.env` file in the project root (same folder as `setup.sh`) with:

   ```
   DB_HOST=<your MariaDB host (e.g. localhost)>
   DB_NAME=index5_db
   DB_USER=<your MariaDB user>
   DB_PASS=<your MariaDB password>
   ```
- Make the setup script executable and run it:

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
- Ensure Apache can serve the files (if you get permission errors, adjust ownership or permissions):

   ```bash
   sudo chown -R www-data:www-data /var/www/html/COS221_Assignment5
   sudo chmod -R 755 /var/www/html/COS221_Assignment5
   ```
- Visit in your browser at http://localhost/COS221\_Assignment5/Application/Login/php/login.php
