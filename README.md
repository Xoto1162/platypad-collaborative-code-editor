# Platypad Collaborative Code Editor

Platypad is an online real-time collaborative code editor based on [Convergence.io](https://convergence.io/) for the realtime features.

The code execution use the [Judge0](https://judge0.com/) online code execution system

The frontend is developped with [VueJS](https://vuejs.org/) 2

[Demo Video](https://user-images.githubusercontent.com/13108023/112696544-56536580-8e86-11eb-8552-4b8e167b07d3.mp4) (in French)

## Features

- Online real-time code editor
- Online code execution
  - Supports Bash, C, C#, C++, Go, Java, Javascript, Kotlin, Lua, Pascal, PHP, Python, R, Ruby, Rust, Scala, SQL, Swift, TypeScript and VB.net
- Written chat
- Vocal chat in P2P

## Run the project on your computer

### Clone the repository

```
git clone https://github.com/Xoto1162/platypad-collaborative-code-editor.git
```

### Build the frontend

Go to the root of the project folder and run the following commands:

```
npm install
npm run build
```

### Run the servers

At the root of the project folder run the following command:

```
docker-compose up
```

The software is now accessible at http://localhost

### Bonus : Add SSL certificate

In order to make the audio chat work, you need to configure SSL certificates.

SSL certificates are provided in the `config/nginx/ssl` folder but they are **not verified**.

You can remove them and add your own certificates if you want.

To activate the HTTPS in the software some editions must be made in the config files.

#### .env

You must edit the `PROTOCAL` variable and set the value to `https`

```
...
PROTOCOL=https
...
```

#### config/nginx/default.conf

Uncomment the following lines :

```
server {
    listen       80;

    # Change hostname if using ssl on a public domain
    server_name  localhost;
    return 301 https://localhost$request_uri;
}

...

server {
    listen     443 ssl;
    #listen       80;
    
    ...
    
    ssl_certificate /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;
    
    ...
}
```
