# weather-thing (WIP)
This is a technical test for AcidLabs

## Prerequisites
* docker (with composer)
* git

## How to run it under AWS?
0. Create an AWS account, a VPC and connect it to a IGW.

1. Create a EC2 instance with ports 80/443 and run the following on it.
    ``` bash
    sudo yum install git
    git clone https://github.com/KukyNekoi/weather-thing
    cd weather-thing/
    yum install docker
    sudo yum install docker
    sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo usermod -a -G docker ec2-user
    ```

2. Edit the .env file under the `weather-thing` folder in order to set up your variables

3. Then run the following
    ```
    docker-compose up # yeah, you need to install it first
    ```

## How to run it locally?

Clone this repo, edit the .env file under the `weather-thing` folder in order to set up your variables, then run the following:
```
docker-compose up
```