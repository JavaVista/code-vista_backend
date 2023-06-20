## Docker

To build your Docker image, you can use the --build-arg option to pass your environment variables:

```shell
docker build --build-arg NODE_ENV=development --build-arg ROOT_DOMAIN_DEV=<replace_with_your_domain_dev_or_localhost_dev_url> --build-arg ROOT_DOMAIN_PROD=<replace_with_your_domain_url> -t <name-of-your-image>:<version> .
```

To create a image

```shell
docker run -d --name <name-of-your-container> -p 3005:3005 <name-of-your-image>:<version>
```
