# Laravel CRUD

## Set-up Locally

### Install dependencies of the project

```zsh
# PHP dependencies
composer install

# React dependencies
npm install
```

### Create the env file

You can manually create a `.env` file with the same content of the `.env.example` file, you can also run the following command in the terminal:

```zsh
cp .env.example .env
```

Then generate the `APP_KEY` for Laravel

```
php artisan key:generate
```

### Set up database

You need to create a database in the `/database` directory, you can create it manually by creating a `database.sqlite` file or running the following command:

```zsh
touch database/database.sqlite
```

After that, you need to run the migration to apply the needed tables and fields.

```zsh
php artisan migrate
```

### Run the project

Once everything is set up you can run the project by using the following command:

```zsh
composer run dev
```
